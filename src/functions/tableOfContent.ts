// utils/tableOfContents.ts
import React from 'react';

export interface TocItem {
  id: string;
  text: string;
  level: number;
  type: 'heading' | 'list';
  listType?: 'ordered' | 'unordered';
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

  // Handle headings (h1-h6)
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

  // Handle lists (ul, ol)
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
            level: 0, // Lists don't use levels like headings
            type: 'list',
            listType: elementType === 'ol' ? 'ordered' : 'unordered'
          });
        }
      }
    });
  }

  // Recursively process children
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

export const buildFlatToc = (items: TocItem[]): TocItem[] => {
  const result: TocItem[] = [];
  let currentListItems: TocItem[] = [];
  let currentListType: 'ordered' | 'unordered' | null = null;

  items.forEach((item, index) => {
    if (item.type === 'heading') {
      // If we were building a list, finish it first
      if (currentListItems.length > 0 && currentListType) {
        result.push({
          id: `list-${result.length}`,
          text: '', // Not used for list containers
          level: 0,
          type: 'list',
          listType: currentListType,
          subItems: [...currentListItems]
        });
        currentListItems = [];
        currentListType = null;
      }

      // Add heading directly
      result.push({ ...item, subItems: [] });
    }
    else if (item.type === 'list') {
      // Start a new list or continue current one
      if (currentListType === null) {
        currentListType = item.listType!;
      }

      // If list type changed, finish previous list and start new one
      if (currentListType !== item.listType) {
        result.push({
          id: `list-${result.length}`,
          text: '',
          level: 0,
          type: 'list',
          listType: currentListType,
          subItems: [...currentListItems]
        });
        currentListItems = [];
        currentListType = item.listType!;
      }

      currentListItems.push({ ...item, subItems: [] });
    }
  });

  // Don't forget the last list if there is one
  if (currentListItems.length > 0 && currentListType) {
    result.push({
      id: `list-${result.length}`,
      text: '',
      level: 0,
      type: 'list',
      listType: currentListType,
      subItems: [...currentListItems]
    });
  }

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

  // Handle list items
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

  // Process other elements
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
  const hierarchicalTocItems = buildFlatToc(flatTocItems); // Using flat structure
  const contentWithIds = addIdsToContent(content, flatTocItems);

  return {
    tocItems: hierarchicalTocItems,
    contentWithIds
  };
};