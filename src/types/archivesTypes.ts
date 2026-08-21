export interface ArchiveImage {
    title: string
    subTitle: string
    fileName: string
    orientation: 'portrait' | 'landscape' | 'square'
    aspectRatio?: number
}