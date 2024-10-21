import { React, ReactMarkdown, RehypeRaw, RemarkGfm } from "../../deps.ts";

type GuideViewerProps = {
  markdown: string;
};

const RehypePlugins = [RehypeRaw];
const RemarkPlugins = [RemarkGfm];

const components = {
  a: ({ node, ...props }) => <a {...props} className="md-a" target="_blank" />,
  h1: ({ node, ...props }) => <h1 {...props} className="text-h1" />,
  h2: ({ node, ...props }) => <h2 {...props} className="text-h2" />,
  h3: ({ node, ...props }) => <h3 {...props} className="text-h3" />,
  h4: ({ node, ...props }) => <h4 {...props} className="text-h4" />,
  h5: ({ node, ...props }) => <h5 {...props} className="text-h5" />,
  li: ({ node, ...props }) => <li className="text-t1" {...props} />,
  ol: ({ node, ...props }) => <ol className="md-ol" {...props} />,
  p: ({ node, ...props }) => <p className="text-t1" {...props} />,
  table: ({ node, ...props }) => <table className="md-table" {...props} />,
  td: ({ node, ...props }) => <td className="text-t1" {...props} />,
};

const GuideViewer = ({ markdown }: GuideViewerProps) => {
  return (
    <div className="guide-viewer">
      <ReactMarkdown
        rehypePlugins={RehypePlugins}
        remarkPlugins={RemarkPlugins}
        components={components}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default GuideViewer;
