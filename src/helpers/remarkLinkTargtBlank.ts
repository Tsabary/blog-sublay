import { visit } from "unist-util-visit";
import { Plugin } from "unified";

const remarkLinkTargetBlank: Plugin = () => {
  return (tree) => {
    visit(tree, "link", (node: any) => {
      node.data ||= {};
      node.data.hProperties ||= {};
      node.data.hProperties.target = "_blank";
      node.data.hProperties.rel = "noopener noreferrer";
    });
  };
};

export default remarkLinkTargetBlank;
