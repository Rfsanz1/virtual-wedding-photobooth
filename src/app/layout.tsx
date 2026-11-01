import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wedding Photobooth — Virtual Wedding Photobooth",
  description: "Photobooth dan guest book digital untuk hari istimewa.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                const removeExtensionAttributes = (root) => {
                  const elements = root.querySelectorAll ? root.querySelectorAll("*") : [];
                  for (const element of [root, ...elements]) {
                    for (const attribute of [...element.attributes]) {
                      if (attribute.name === "bis_skin_checked" || attribute.name.startsWith("__processed_")) {
                        element.removeAttribute(attribute.name);
                      }
                    }
                  }
                };
                removeExtensionAttributes(document.documentElement);
                new MutationObserver((mutations) => {
                  for (const mutation of mutations) {
                    for (const node of mutation.addedNodes) {
                      if (node.nodeType === 1) removeExtensionAttributes(node);
                    }
                    if (mutation.type === "attributes" && mutation.target.nodeType === 1) {
                      removeExtensionAttributes(mutation.target);
                    }
                  }
                }).observe(document.documentElement, { subtree: true, childList: true, attributes: true });
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen" suppressHydrationWarning>{children}</body>
    </html>
  );
}
