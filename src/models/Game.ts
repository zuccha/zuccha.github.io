type Game = {
  title: string;
  image: {
    src: string;
    alt: string;
  };
  downloads: {
    macOS: string;
    windows: string;
  };
  description: string[];
};

export const parseGame = (maybeGame: string): Game => {
  try {
    return JSON.parse(maybeGame);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
