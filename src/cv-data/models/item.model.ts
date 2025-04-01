import { ContactModel } from "./contacts.model";
import { EducationModel } from "./education.model";
import { ExperienceModel } from "./experience.model";
import { HobbyModel } from "./hobby.model";
import { SkillModel } from "./skills.model";


export enum ItemTypes {
    Contacts,
    Skills,
    Education,
    Hobby,
    Languages,
    Position,
    Experience,
    Summary
}

export interface ItemModel {
    photo: string;
    type: ItemTypes;
    contacts?: ContactModel[];
    skills?: SkillModel[];
    education?: EducationModel[];
    hobby?: string[];
    positionDescription?: string;
    summaryDescription?: string;
    experience?: ExperienceModel[];
}

export interface ItemSettingsModel {
    type: ItemTypes;
    title: string;
    icon: string;
    alt: string;
}

export const ItemSettings: ItemSettingsModel[] = [
    {
        type: ItemTypes.Contacts,
        title: "Contacts",
        icon: "/icons/globe.svg",
        alt: "Contacts",
    },
    {
        type: ItemTypes.Skills,
        title: "Skills",
        icon: "/icons/pie-chart.svg",
        alt: "Skills",
    },
    {
        type: ItemTypes.Education,
        title: "Education",
        icon: "/icons/education.svg",
        alt: "Education",
    },
    {
        type: ItemTypes.Hobby,
        title: "Hobby",
        icon: "/icons/heart.svg",
        alt: "Hobby",
    },
    {
        type: ItemTypes.Languages,
        title: "Languages",
        icon: "/icons/language.svg",
        alt: "Languages",
    },
    {
        type: ItemTypes.Summary,
        title: "Summary",
        icon: "/icons/summary.svg",
        alt: "Summary",
    },
    {
        type: ItemTypes.Experience,
        title: "Work Experience",
        icon: "/icons/experience.svg",
        alt: "Experience",
    },
    {
        type: ItemTypes.Position,
        title: "Desired Position",
        icon: "/icons/target.svg",
        alt: "Position",
    }
];