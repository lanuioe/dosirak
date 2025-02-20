import SwiperCard from '@/components/atom/common/SwiperCard';
import FeedWriter from '@/components/molecule/feed/FeedWriter';

import FeedInteraction from '@/components/molecule/feed/FeedInteraction';
import FeedSubject from '@/components/atom/feed/FeedSubject';
import FeedText from '@/components/molecule/feed/FeedText';
import useFeedStore from '@/store/useFeedStore';
import CommentWrite from '@/components/molecule/feed/CommentWrite';
import CommentShowButton from '@/components/molecule/feed/CommentShowButton';

const FeedCard = ({ feed }) => {
  const { expandFeed, setExpandFeed } = useFeedStore((state) => state);
  const handleFeedExpand = () => setExpandFeed(feed.id);

  const handleMainTextClick = () => {
    if (expandFeed !== feed.id) setExpandFeed(feed.id);
  };

  return (
    <li className="noto pointer flex flex-col gap-3">
      <FeedWriter feed={feed} />
      <SwiperCard
        onClick={handleFeedExpand}
        slideStyle="h-[200px] select-none cursor-pointer"
        imgStyle="rounded-2xl"
        imageArray={feed.images}
      />
      <FeedInteraction feed={feed} />
      <div
        onClick={handleMainTextClick}
        className={`flex flex-col gap-3 ${expandFeed === feed.id ? '' : 'cursor-pointer'}`}
      >
        <FeedSubject feed={feed} />
        <FeedText feed={feed} />
      </div>
      <div>
        <CommentWrite feed={feed} />
        <CommentShowButton feed={feed} />
      </div>
    </li>
  );
};

export default FeedCard;
