export interface ISpot {
    id: number;
    name: string;
    about: string;
    approach: string;
    facebook: string;
    rating: number;
    created: Date;
    createdby: string;
    main_image: number;
    lat: number;
    lng: number;
    views: number;
    deleted: boolean;
    big_image: string;
    small_image: string;
    displayname: string;
    uid: string;
}

export interface IToDbSpot {
    name: string;
    about: string;
    approach: string;
    facebook: string;
    lat: number;
    lng: number;
    current_user_id: string;
    main_image: string | undefined;
}

export interface IModal {
    show?: boolean;
    onHide: () => void;
}

export interface IDbUser {
    uid: string;
    displayName: string;
}

export interface IPos {
    lat: number;
    lng: number;
}

export interface IImage {
    id: number;
    big_image: string;
    small_image: string;
}

export interface IImagePreUploade {
    id?: number;
    big_image: string;
    small_image: string;
}

export type UserContextState = {
    id: number;
    identifier: string;
    displayname: string;
}
export {}