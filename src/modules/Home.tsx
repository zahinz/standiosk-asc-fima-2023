import Header from "@/components/single/Header";
import { Button } from "@/components/ui/button";
import usePublicItemExists from "@/hooks/usePublicItems";
import { Eye, Speech } from "lucide-react";
import { useNavigate } from "react-router-dom";
import withScreensaver from "./Screensaver";

const Home = () => {
  const maxFileNumber = import.meta.env.VITE_LAST_POSTER_ID as number;
  const ids = Array.from({ length: maxFileNumber }, (_, i) => i + 1);

  const shuffleArray = (array: number[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  const shuffledIds = shuffleArray(ids);

  return (
    <div className="bg-slate-50">
      <Header />
      <div className="grid grid-cols-3 gap-4 p-6">
        {shuffledIds.map((id) => {
          //   check if file exists
          const imageUrl = `/poster/thumbnail/${id}.webp`;
          const imageAvailable = usePublicItemExists(imageUrl);
          if (!imageAvailable) {
            return null;
          }
          return <Thumbnail key={id} id={id} />;
        })}
      </div>
    </div>
  );
};

type ThumbnailProps = { id: number };

const Thumbnail = ({ id }: ThumbnailProps) => {
  const url = `/poster/jpg/${id}.jpg`;
  const navigate = useNavigate();
  const handleThumbnailClick = () => {
    navigate(`/poster/${id}`);
  };

  const audioUrl = `/poster/audio/${id}.aac`;
  const isSoundExist = usePublicItemExists(audioUrl);

  return (
    <div
      onClick={handleThumbnailClick}
      className="overflow-hidden rounded-md aspect-video shadow cursor-pointer relative group hover:shadow-lg transition-all"
    >
      <Button
        variant="outline"
        className="z-50 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all"
      >
        <Eye className="mr-2" />
        View
      </Button>

      <img
        className="group-hover:brightness-50 transition-all"
        src={url}
        alt="poster"
        loading="lazy"
      />
      {isSoundExist && (
        <div className="border-2 border-white text-slate-700 bg-[#00D084] p-2 rounded-md absolute top-3 right-3 flex items-center gap-2 animate-bounce">
          <Speech />
          <span className="text-sm font-semibold">Audio presentation</span>
        </div>
      )}
    </div>
  );
};

export default withScreensaver(Home);
