import Image from 'next/image';

type CatQuoteProps = {
  imageSrc: string;
  alt?: string;
  quote: string;
};

const CatQuote = ({ imageSrc, alt = 'Cat', quote }: CatQuoteProps) => (
  // <Stack align="center">
  //   <Image src={imageSrc} alt={alt} radius="md" />
  //   <Text size="lg">{quote}</Text>
  // </Stack>
  <div>
    <Image src={imageSrc} alt={alt} width={100} height={100} />
    <p>{quote}</p>
  </div>
);

export default CatQuote;
