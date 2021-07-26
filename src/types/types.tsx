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
    windsensor: string;
    sv?: WindDirectionsValues;
    v?: WindDirectionsValues;
    nv?: WindDirectionsValues;
    n?: WindDirectionsValues;
    nø?: WindDirectionsValues;
    ø?: WindDirectionsValues;
    sø?: WindDirectionsValues;
    s?: WindDirectionsValues;
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
    windsensor: string;
}

export interface IModal {
    show?: boolean;
    onHide: () => void;
}

export interface IDbUser {
    uid: string;
    displayname: string;
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

export type WindDirectionsValues = "good" | "ok"  | "bad"

export interface IWindDirections {
    sv: WindDirectionsValues;
    v: WindDirectionsValues;
    nv: WindDirectionsValues;
    n: WindDirectionsValues;
    nø: WindDirectionsValues;
    ø: WindDirectionsValues;
    sø: WindDirectionsValues;
    s: WindDirectionsValues;
}

export const defaultWindDirections:IWindDirections = {
    sv: "bad",
    v: "bad",
    nv: "bad",
    n: "bad",
    nø: "bad",
    ø: "bad",
    sø: "bad",
    s: "bad",
}

export interface ISelectedWindDirections {
    sv: boolean,
    v: boolean,
    nv: boolean,
    n: boolean,
    nø: boolean,
    ø: boolean,
    sø: boolean,
    s: boolean
}

export const defaultSelectedWindDirections: ISelectedWindDirections = {
    sv: false,
    v: false,
    nv: false,
    n: false,
    nø: false,
    ø: false,
    sø: false,
    s: false
}

export interface IPost {
    post: string,
    post_title: string,
    date: Date,
    displayname: string,
    id: number,
}

export interface IPostComment {
    post: string,
    date: Date,
    displayname: string,
}

export interface IPostCommentDb {
    post: string,
    date: Date,
    userId: string,
}

export {}