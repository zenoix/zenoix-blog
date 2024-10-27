import satori from "satori";
import type { CollectionEntry } from "astro:content";
import { SITE } from "@config";
import loadGoogleFonts, { type FontOptions } from "../loadGoogleFont";

export default async (post: CollectionEntry<"blog">) => {
  return satori(
    <div
      style={{
        backgroundImage: `url(https://raw.githubusercontent.com/zenoix/zenoix-blog/refs/heads/main/public/og-background.jpg)`,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-1px",
          right: "-1px",
          background: "#11111b",
          opacity: "0.9",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "center",
          margin: "2.5rem",
          width: "88%",
          height: "80%",
        }}
      />
      <div
        style={{
          background: "#1e1e2e",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "center",
          margin: "2rem",
          width: "88%",
          height: "80%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "20px",
            width: "90%",
            height: "90%",
            color: "transparent",
          }}
        >
          <p
            style={{
              backgroundImage: `url(https://raw.githubusercontent.com/zenoix/zenoix-blog/refs/heads/main/public/og-background.jpg)`,
              backgroundClip: "text",
              fontSize: 72,
              fontWeight: "bold",
              maxHeight: "84%",
              overflow: "hidden",
            }}
          >
            {post.data.title}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "8px",
              fontSize: 28,
            }}
          >
            <span>
              <span
                style={{
                  backgroundImage: `url(https://raw.githubusercontent.com/zenoix/zenoix-blog/refs/heads/main/public/og-background.jpg)`,
                  backgroundClip: "text",
                }}
              >
                by{" "}
              </span>
              <span
                style={{
                  color: "transparent",
                }}
              >
                "
              </span>
              <span
                style={{
                  backgroundImage: `url(https://raw.githubusercontent.com/zenoix/zenoix-blog/refs/heads/main/public/og-background.jpg)`,
                  backgroundClip: "text",
                  overflow: "hidden",
                  fontWeight: "bold",
                }}
              >
                {post.data.author}
              </span>
            </span>

            <span
              style={{
                backgroundImage: `url(https://raw.githubusercontent.com/zenoix/zenoix-blog/refs/heads/main/public/og-background.jpg)`,
                backgroundClip: "text",
                overflow: "hidden",
                fontWeight: "bold",
              }}
            >
              {SITE.title}
            </span>
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: (await loadGoogleFonts(
        post.data.title + post.data.author + SITE.title + "by"
      )) as FontOptions[],
    }
  );
};
