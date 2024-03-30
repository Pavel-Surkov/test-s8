import { useCallback, useEffect, useRef, useState } from 'react';
import z from 'zod';
import Input from './components/Input';
import PostItem from './components/PostItem';
import { postsSchema } from './static/postsSchema';
import getPosts from './functions/getPosts';

const INITIAL_ELEMENTS_COUNT = 10;

function App() {
  const [elementsCount, setElementsCount] = useState(INITIAL_ELEMENTS_COUNT);
  const [data, setData] = useState<z.infer<typeof postsSchema>>([]);

  const scrollContainerRef = useRef<HTMLUListElement>(null);

  const scrollControl = useCallback(async () => {
    const scrollElement = scrollContainerRef.current;

    if (
      scrollElement &&
      scrollElement.scrollTop + scrollElement.clientHeight ===
        scrollElement.scrollHeight
    ) {
      const posts = await getPosts(data.length, elementsCount);

      if (posts) {
        setData([...data, ...posts]);
      }
    }
  }, [data, elementsCount]);

  // Initial query
  useEffect(() => {
    (async () => {
      const posts = await getPosts(0, INITIAL_ELEMENTS_COUNT);

      if (posts) {
        setData([...posts]);
      }
    })();
  }, []);

  // Scroll event listener
  useEffect(() => {
    const scrollElement = scrollContainerRef.current;
    scrollElement?.addEventListener('scroll', scrollControl);

    return () => scrollElement?.removeEventListener('scroll', scrollControl);
  }, [scrollControl]);

  return (
    <main className="flex flex-col items-center p-10 h-[100vh]">
      <div className="flex flex-col max-w-[500px] w-full gap-10 items-center h-full">
        <div className="flex-shrink-0">
          <Input
            elementsCount={elementsCount}
            setElementsCount={setElementsCount}
          />
        </div>
        <ul
          ref={scrollContainerRef}
          className="border rounded-md flex-grow w-full overflow-scroll"
        >
          {data.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
