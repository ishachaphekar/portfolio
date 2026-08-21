import { ArchiveImage } from "@/types/archivesTypes";

/**
 * Metadata array for archive images stored in public/assets/archives/
 * Includes exact image aspect ratio (width / height) to allow dynamic, zero-hardcode Bento grid calculation.
 */
export const ARCHIVES: ArchiveImage[] = [
    {
        title: "Dominion Brand identity",
        subTitle: "Visual Identity & Typography",
        fileName: "Brand identity.webp",
        orientation: "landscape",
        aspectRatio: 1.34,
    },
    {
        title: "Ruchkar Foods Packaging",
        subTitle: "Gourmet Food Packaging",
        fileName: "Packaging Design.webp",
        orientation: "landscape",
        aspectRatio: 1.50,
    },
    {
        title: "Repos Energy Standee",
        subTitle: "Event & Print Collateral",
        fileName: "repos standee.webp",
        orientation: "portrait",
        aspectRatio: 0.60,
    },
    {
        title: "Repos Creative Campaign I",
        subTitle: "Social Media Design",
        fileName: "Repos instagram creative.webp",
        orientation: "portrait",
        aspectRatio: 0.80,
    },
    {
        title: "Repos Creative Campaign II",
        subTitle: "Social Media Design",
        fileName: "Repos partner creative.webp",
        orientation: "portrait",
        aspectRatio: 0.81,
    },
    {
        title: "Repos Corporate Invite",
        subTitle: "Print & Event Invites",
        fileName: "Repos invite.webp",
        orientation: "landscape",
        aspectRatio: 1.50,
    },
    {
        title: "Repos Product Pamphlet",
        subTitle: "Marketing Collateral",
        fileName: "Repos pamphlet.webp",
        orientation: "portrait",
        aspectRatio: 0.70,
    },
    {
        title: "Sangam Flea Campaign Ad",
        subTitle: "Static Advertising",
        fileName: "Sangam Ad static.webp",
        orientation: "portrait",
        aspectRatio: 0.75,
    },
    {
        title: "Sangam 11:11 Flea Social Post",
        subTitle: "Instagram Campaign",
        fileName: "Sangam instagram post.webp",
        orientation: "portrait",
        aspectRatio: 0.75,
    },
    {
        title: "Sangam Flea Standee",
        subTitle: "Event Branding & Standee",
        fileName: "Sangam standee.webp",
        orientation: "portrait",
        aspectRatio: 0.71,
    },
    {
        title: "Sangam Flea Event Poster",
        subTitle: "Illustrative Event Campaign",
        fileName: "Sangam poster.webp",
        orientation: "portrait",
        aspectRatio: 0.72,
    },
    {
        title: "Sangam Ticket Counter Signage",
        subTitle: "Offline Event Branding",
        fileName: "Sangam ticket counter.webp",
        orientation: "portrait",
        aspectRatio: 0.71,
    },
    {
        title: "Visual System Exploration I",
        subTitle: "Graphic & Brand Systems",
        fileName: "Visual design 1.webp",
        orientation: "square",
        aspectRatio: 0.99,
    },
    {
        title: "Visual System Exploration II",
        subTitle: "Visual Design & Composition",
        fileName: "Visual design 2.webp",
        orientation: "landscape",
        aspectRatio: 1.31,
    },
    {
        title: "Visual System Exploration III",
        subTitle: "Visual Design & Composition",
        fileName: "Visual design 3.webp",
        // fileName: "Visual design 3.jpg",
        orientation: "landscape",
        aspectRatio: 1.71,
    },
];