import { createClient } from 'contentful';
import Image from 'next/image';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'recipe',
  });

  const paths = res.items.map((item) => {
    return {
      params: {
        slug: item.fields.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: 'recipe',
    'fields.slug': params.slug,
  });

  return {
    props: { recipe: items[0] },
  };
};

export default function RecipeDetails({ recipe }) {
  return (
    <div>
      <div className="banner">
        <Image />
      </div>
    </div>
  );
}
