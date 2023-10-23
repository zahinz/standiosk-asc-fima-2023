import { useNavigate, useParams } from "react-router-dom";
import NotFound404 from "@/components/single/NotFound404";
import usePublicItemExists from "@/hooks/usePublicItems";
import useKeyPress from "@/hooks/useKeyPress";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Pause, Volume2 } from "lucide-react";
import { useEffect } from "react";
import useAudioPlayer from "@/hooks/useAudioPlayer";
import withScreensaver from "./Screensaver";

const SinglePoster = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id || "");

  const imageUrl = `/poster/jpg/${params.id}.jpg`;
  const imageAvailable = usePublicItemExists(imageUrl);

  const pressLeft = useKeyPress("ArrowLeft");
  const pressRight = useKeyPress("ArrowRight");

  const handleNext = () => {
    let newId;
    if (id === parseInt(import.meta.env.VITE_LAST_POSTER_ID)) {
      newId = 1;
    } else {
      newId = id + 1;
    }
    navigate(`/poster/${newId}`);
  };

  const handlePrevious = () => {
    let newId;
    if (id === 1) {
      newId = import.meta.env.VITE_LAST_POSTER_ID as number;
    } else {
      newId = parseInt(params.id || "") - 1;
    }
    navigate(`/poster/${newId}`);
  };

  useEffect(() => {
    if (pressLeft) {
      handlePrevious();
    }

    if (pressRight) {
      handleNext();
    }
  }, [pressLeft, pressRight]);

  if (!imageAvailable) {
    return <NotFound404 />;
  }

  return (
    <div className="w-screen h-screen bg-slate-50">
      <div className="h-[calc(100%_-_110px)] w-full p-6 relative group">
        <div
          onClick={handlePrevious}
          className="h-full flex items-center absolute left-0 top-0 p-6 opacity-10 group-hover:opacity-100 transition-all cursor-pointer hover:bg-slate-100"
        >
          <ChevronLeft size={48} />
        </div>
        <div
          onClick={handleNext}
          className="h-full flex items-center absolute right-0 top-0 p-6 opacity-10 group-hover:opacity-100 transition-all cursor-pointer hover:bg-slate-100"
        >
          <ChevronRight size={48} />
        </div>
        <img
          className="h-full w-full object-contain"
          src={`/poster/jpg/${params.id}.jpg`}
          alt="poster"
        />
      </div>
      <ActionBar id={id} />
    </div>
  );
};

type ActionBarProps = {
  id: number;
};

const ActionBar = ({ id }: ActionBarProps) => {
  const navigate = useNavigate();
  const audioUrl = `/poster/audio/${id}.aac`;
  const isSoundExist = usePublicItemExists(audioUrl);

  const { url, isPlaying, progress, togglePlayPause, audioRef, reset } =
    useAudioPlayer({ enabled: isSoundExist, initialUrl: audioUrl });

  const handleBackHome = () => {
    navigate("/");
    reset();
  };

  useEffect(() => {
    reset();
  }, [id]);
  return (
    <div className="h-[110px] bg-[#1E4EAF] fixed bottom-0 left-0 right-0 p-6 flex justify-between items-center">
      <div className="flex w-fit items-center">
        <div className="w-[600px] flex items-center justify-start">
          <img className="w-[11%] -mr-4" src="/logo/imam.png" alt="IMAM logo" />
          <img className="w-[51%]" src="/logo/fima.png" alt="FIMA logo" />
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={handleBackHome} size="lg">
          Back to home
        </Button>
        <Button
          onClick={togglePlayPause}
          disabled={!isSoundExist}
          size="lg"
          className="relative overflow-hidden w-[200px] "
        >
          <div
            className="h-full left-0 bg-[#00D084] absolute"
            style={{ width: progress + "%", transition: "width 0.2s ease" }}
          />
          <div className="z-50 flex items-center">
            {isPlaying ? (
              <>
                <Pause className="mr-4" />
                Pause
              </>
            ) : (
              <>
                <Volume2 className="mr-4" />
                Play audio
              </>
            )}
          </div>
        </Button>
        <audio ref={audioRef} src={url} />
      </div>
    </div>
  );
};

export default withScreensaver(SinglePoster);
