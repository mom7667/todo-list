import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title = 'Todo List', 
  description = '심플하고 직관적인 할 일 관리 앱' 
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="theme-color" content="#6366F1" />
    </Helmet>
  );
}; 