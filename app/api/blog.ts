import type { NextApiRequest, NextApiResponse } from 'next';
import { Octokit } from '@octokit/rest';

const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_REPO) {
  throw new Error('GITHUB_REPO environment variable is not defined');
}

const parseRepo = (repo: string) => {
  const [owner, repoName] = repo.split('/');
  return { owner, repo: repoName };
};

export const getBlogIssues = async () => {
  const { owner, repo } = parseRepo(GITHUB_REPO);

  const octokit = new Octokit({
    auth: GITHUB_TOKEN
  });

  const { data: issues } = await octokit.rest.issues.listForRepo({
    owner,
    repo,
    state: 'open',
    per_page: 100
  });

  return Array.isArray(issues) ? issues : [];
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Missing title or content' });
    }
    try {
      // Create GitHub issue using Octokit
      const { owner, repo } = parseRepo(GITHUB_REPO);
      const octokit = new Octokit({
        auth: GITHUB_TOKEN
      });

      const { data: issue } = await octokit.rest.issues.create({
        owner,
        repo,
        title,
        body: content
      });

      return res.status(200).json({
        message: 'Blog post published and GitHub issue created',
        issueNumber: issue.number
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error', details: error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
};

export default handler;
