import { AnyType } from '../types';

//------------------------------------------------------------------------------------
export const getParentNode = (node: Node, path: Node[]) => {
  if (!node.parentNode) {
    return;
  }

  path.push(node.parentNode);
  getParentNode(node.parentNode, path);
};

//------------------------------------------------------------------------------------
export const getPath = (node: Node) => {
  const path: Node[] = [];
  path.push(node);
  getParentNode(node, path);
  return path;
};

//------------------------------------------------------------------------------------
export const getSelector = (event: Event) => {
  const immutableTarget = (event.target || event.srcElement) as AnyType;

  let target = (event.target || event.srcElement) as AnyType;

  const elements = [];

  for (
    let i = 0;
    target &&
    target.nodeType === Node.ELEMENT_NODE &&
    target.nodeType !== Node.DOCUMENT_TYPE_NODE;
    target = target.previousSibling
  ) {
    if (i) {
      elements.push(target);
    }
    i += 1;
  }

  const path =
    typeof (event as AnyType).path === 'undefined'
      ? getPath(event.target as Node)
      : (event as AnyType).path;

  const { outerHTML } = immutableTarget;

  return path
    .reverse()
    .map(
      (node: Element) =>
        (node.localName || '') +
        (node.id ? `#${node.id}` : '') +
        (node.className ? `.${node.className}` : '') +
        (node.outerHTML === outerHTML ? `:nth-child(${elements.length})` : ''),
    )
    .filter((v: string): boolean => Boolean(v))
    .join(' > ');
};
