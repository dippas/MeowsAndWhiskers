import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

const parseRepo = (repo: string) => {
  const [owner, repoName] = repo.split('/');
  return { owner, repo: repoName };
};

const POST = async (request: Request) => {
  try {
    const { title, content } = await request.json();

    if (!process.env.GITHUB_REPO || !process.env.GITHUB_TOKEN) {
      return NextResponse.json({ error: 'GitHub configuration is missing' }, { status: 500 });
    }

    const { owner, repo } = parseRepo(process.env.GITHUB_REPO);
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const result = await octokit.issues.create({
      owner,
      repo,
      title,
      body: content
    });

    return NextResponse.json({ success: true, data: result.data });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Error publishing blog post' }, { status: 500 });
  }
};

export { POST };
