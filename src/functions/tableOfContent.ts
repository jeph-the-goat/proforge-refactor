import React from 'react';

export interface TocItem {
  id: string;
  text: string;
  level: number;
  type: 'heading' | 'list';
  subItems?: TocItem[];
}


interface ReactElementWithProps extends React.ReactElement {
  props: {
    children?: React.ReactNode;
    [key: string]: any;
  };
}

export const generateId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-|-$/g, '');
};


const getTextContent = (element: ReactElementWithProps): string => {
  const { children } = element.props;

  if (typeof children === 'string') {
    return children;
  }

  if (typeof children === 'number') {
    return children.toString();
  }

  if (Array.isArray(children)) {
    return children
      .map((child: React.ReactNode) => {
        if (typeof child === 'string') return child;
        if (typeof child === 'number') return child.toString();
        if (React.isValidElement(child)) {
          return getTextContent(child as ReactElementWithProps);
        }
        return '';
      })
      .join('');
  }

  if (React.isValidElement(children)) {
    return getTextContent(children as ReactElementWithProps);
  }

  return '';
};


const isHeading = (elementType: string | React.ComponentType): boolean => {
  return typeof elementType === 'string' && /^h[1-6]$/i.test(elementType);
};

const isList = (elementType: string | React.ComponentType): boolean => {
  return typeof elementType === 'string' && ['ul', 'ol'].includes(elementType);
};

const processElement = (element: ReactElementWithProps, tocItems: TocItem[]): void => {
  const elementType = element.type;

  if (isHeading(elementType)) {
    const level = parseInt((elementType as string).charAt(1));
    const text = getTextContent(element);
    const id = generateId(text);

    if (text.trim()) {
      tocItems.push({
        id,
        text: text.trim(),
        level,
        type: 'heading'
      });
    }
  }

  else if (isList(elementType)) {
    const children = React.Children.toArray(element.props.children);
    children.forEach((child) => {
      if (React.isValidElement(child) && child.type === 'li') {
        const text = getTextContent(child as ReactElementWithProps);
        const id = generateId(text);

        if (text.trim()) {
          tocItems.push({
            id,
            text: text.trim(),
            level: elementType === 'ol' ? 7 : 8,
            type: 'list'
          });
        }
      }
    });
  }

  if (element.props.children) {
    const children = React.Children.toArray(element.props.children);
    children.forEach((child) => {
      if (React.isValidElement(child)) {
        processElement(child as ReactElementWithProps, tocItems);
      }
    });
  }
};

export const processContentForToc = (content: React.ReactNode): TocItem[] => {
  const tocItems: TocItem[] = [];

  if (React.isValidElement(content)) {
    processElement(content as ReactElementWithProps, tocItems);
  } else if (Array.isArray(content)) {
    content.forEach((item) => {
      if (React.isValidElement(item)) {
        processElement(item as ReactElementWithProps, tocItems);
      }
    });
  }

  return tocItems;
};

export const buildHierarchicalToc = (items: TocItem[]): TocItem[] => {
  const result: TocItem[] = [];
  const stack: TocItem[] = [];

  items.forEach(item => {
    while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
      stack.pop();
    }

    const newItem = { ...item, subItems: [] };

    if (stack.length === 0) {
      result.push(newItem);
    } else {
      const parent = stack[stack.length - 1];
      if (!parent.subItems) parent.subItems = [];
      parent.subItems.push(newItem);
    }

    if (item.type === 'heading') {
      stack.push(newItem);
    }
  });

  return result;
};

const addIdToElement = (element: ReactElementWithProps, tocItems: TocItem[]): React.ReactElement => {
  const elementType = element.type;

  // Handle headings
  if (isHeading(elementType)) {
    const text = getTextContent(element);
    const tocItem = tocItems.find(item =>
      item.type === 'heading' && item.text === text.trim()
    );

    if (tocItem) {
      return React.cloneElement(element, {
        ...element.props,
        id: tocItem.id,
        children: processChildren(element.props.children, tocItems)
      });
    }
  }

  else if (elementType === 'li') {
    const text = getTextContent(element);
    const tocItem = tocItems.find(item =>
      item.type === 'list' && item.text === text.trim()
    );

    if (tocItem) {
      return React.cloneElement(element, {
        ...element.props,
        id: tocItem.id,
        children: processChildren(element.props.children, tocItems)
      });
    }
  }

  return React.cloneElement(element, {
    ...element.props,
    children: processChildren(element.props.children, tocItems)
  });
};

const processChildren = (children: React.ReactNode, tocItems: TocItem[]): React.ReactNode => {
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return addIdToElement(child as ReactElementWithProps, tocItems);
    }
    return child;
  });
};

export const addIdsToContent = (content: React.ReactNode, tocItems: TocItem[]): React.ReactNode => {
  if (React.isValidElement(content)) {
    return addIdToElement(content as ReactElementWithProps, tocItems);
  }

  if (Array.isArray(content)) {
    return content.map((item, index) => {
      if (React.isValidElement(item)) {
        return React.cloneElement(
          addIdToElement(item as ReactElementWithProps, tocItems),
          { key: index }
        );
      }
      return item;
    });
  }

  return content;
};

export const generateTableOfContents = (content: React.ReactNode) => {
  const flatTocItems = processContentForToc(content);
  const hierarchicalTocItems = buildHierarchicalToc(flatTocItems);
  const contentWithIds = addIdsToContent(content, flatTocItems);

  return {
    tocItems: hierarchicalTocItems,
    contentWithIds
  };
};
