import { Media, News } from '@prisma/client';

export type NewsWithMedia = News & { medias: Media[] };
