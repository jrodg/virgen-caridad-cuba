import { useLanguage } from "../context/LanguageContext";
import { useLocalizedContent } from "../i18n/localize";
import type { VideoRecord } from "../types";

type PlayerProps = {
  video: VideoRecord;
};

const Player = ({ video }: PlayerProps) => {
  const { t } = useLanguage();
  if (video.type === "youtube" || video.type === "vimeo") {
    return (
      <iframe
        title={video.title}
        src={video.embedUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  if ((video.type === "file" || video.type === "url") && video.playbackUrl) {
    return (
      <video controls preload="metadata" src={video.playbackUrl}>
        {t("videos.unsupported")}
      </video>
    );
  }
  return <div className="player-empty">{t("videos.unavailable")}</div>;
};

const Videos = () => {
  const { t } = useLanguage();
  const { videos } = useLocalizedContent();

  return (
    <div className="page">
      <header className="page-hero">
        <p className="kicker">{t("videos.kicker")}</p>
        <h1>{t("videos.title")}</h1>
        <p className="lede">{t("videos.lede")}</p>
      </header>
      {videos.length === 0 ? (
        <p className="empty">{t("videos.empty")}</p>
      ) : (
        <div className="video-grid">
          {videos.map((video) => (
            <article key={video.id} className="video-card">
              <div className="player">
                <Player video={video} />
              </div>
              <div className="video-meta">
                <h2>{video.title}</h2>
                {video.description && <p>{video.description}</p>}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Videos;
