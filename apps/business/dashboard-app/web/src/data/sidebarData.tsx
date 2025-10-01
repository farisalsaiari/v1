
import { h, JSX } from 'preact';

export interface SidebarItem {
    id: string;
    label: string;
    icon?: string;
    path?: string;
    children?: SidebarItem[];
}

export const IconComponent = ({ type }: { type: string }): JSX.Element => {
    const icons: { [key: string]: JSX.Element } = {
        overview: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Home">
                        <rect id="Rectangle" fill-rule="nonzero" x="0" y="0" width="24" height="24">

                        </rect>
                        <path d="M5,10 L5,19 C5,19.5523 5.44772,20 6,20 L18,20 C18.5523,20 19,19.5523 19,19 L19,10" id="Path" stroke="currentColor" stroke-width="2" stroke-linecap="round">

                        </path>
                        <path d="M21,11 L12.307,4.23875 C12.1264,4.09832 11.8736,4.09832 11.693,4.23875 L3,11" id="Path" stroke="currentColor" stroke-width="2" stroke-linecap="round">

                        </path>
                    </g>
                </g>
            </svg>
        ),
        products: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
            </svg>
        ),
        orders: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
            </svg>
        ),
        payment: (
            <svg className="w-[21px] h-[21px]" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M829.06 73.14h-6.48c-30.41 0-58.57 17.11-75.34 45.75-6.16 10.41-22.29 11.73-29.96 2.43-25.52-31.07-59.41-48.18-95.64-48.18-35.98 0-69.86 17.11-95.41 48.18-6.98 8.48-21.25 8.54-28.27-0.02-25.55-31.05-59.43-48.16-95.41-48.16s-69.86 17.11-95.41 48.18c-7.66 9.38-23.79 8.09-29.95-2.43-16.8-28.64-44.96-45.75-75.36-45.75h-7.23c-46.89 0-85.05 38.16-85.05 85.05V865.8c0 46.89 38.16 85.05 85.05 85.05h7.23c30.39 0 58.55-17.11 75.38-45.79 6.07-10.43 22.23-11.79 29.93-2.38 25.55 31.05 59.43 48.16 95.41 48.16s69.86-17.11 95.41-48.18c7.02-8.52 21.29-8.5 28.27 0.02 25.55 31.05 59.43 48.16 95.66 48.16 35.98 0 69.88-17.11 95.38-48.14 7.73-9.34 23.89-8 29.96 2.36 16.79 28.68 44.95 45.79 75.36 45.79h6.48c46.89 0 85.05-38.16 85.05-85.05V158.2c0-46.9-38.17-85.06-85.06-85.06z m11.91 792.66c0 6.57-5.34 11.91-11.91 11.91h-6.48c-6.14 0-10.91-7.34-12.23-9.61-16.36-27.91-46.61-45.25-78.93-45.25-27.43 0-53.16 12.16-70.64 33.39-6.59 8.02-20.41 21.46-39.14 21.46-18.48 0-32.32-13.46-38.91-21.46-34.84-42.45-106.39-42.46-141.27-0.02-6.59 8.02-20.43 21.48-38.91 21.48s-32.32-13.46-38.91-21.46c-17.43-21.23-43.18-33.39-70.62-33.39-32.36 0-62.61 17.36-78.93 45.25-1.32 2.25-6.11 9.61-12.25 9.61h-7.23c-6.57 0-11.91-5.34-11.91-11.91V158.2c0-6.57 5.34-11.91 11.91-11.91h7.23c6.14 0 10.93 7.36 12.23 9.57 16.34 27.93 46.59 45.29 78.95 45.29 27.45 0 53.2-12.16 70.62-33.38 6.59-8.02 20.43-21.48 38.91-21.48s32.32 13.46 38.91 21.46c34.88 42.48 106.43 42.43 141.27 0.02 6.59-8.02 20.43-21.48 39.16-21.48 18.48 0 32.3 13.45 38.91 21.5 17.46 21.2 43.2 33.36 70.62 33.36 32.32 0 62.57-17.34 78.95-45.29 1.3-2.23 6.07-9.57 12.21-9.57h6.48c6.57 0 11.91 5.34 11.91 11.91v707.6z" fill="currentColor" />
                <path d="M255.83 365.46h512v73.14h-512zM255.74 548.2h365.71v73.38H255.74z" fill="currentColor" />
            </svg>


        ),
        customers: (


            <svg className="w-[21px] h-[21px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 21L22 18M22 18L19 15M22 18H16M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M12 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        ),
        analytics: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
            </svg>
        ),
        marketing: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
            </svg>
        ),
        discounts: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
            </svg>
        ),
        apps: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a bendy2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
            </svg>
        ),
        store: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
            </svg>
        ),




        online: (


            <svg className="w-[21px] h-[21px]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.008 8.008 0 0 0 5.648 6.667zM10.03 13c.151 2.439.848 4.73 1.97 6.752A15.905 15.905 0 0 0 13.97 13h-3.94zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.008 8.008 0 0 0 19.938 13zM4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333 8.008 8.008 0 0 0 4.062 11zm5.969 0h3.938A15.905 15.905 0 0 0 12 4.248 15.905 15.905 0 0 0 10.03 11zm4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.008 8.008 0 0 0-5.648-6.667z" />
                </g>
            </svg>


            // <svg className="w-[21px] h-[21px]" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 1a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13zm4.894 4a5.527 5.527 0 0 0-3.053-2.676c.444.84.765 1.74.953 2.676h2.1zm.582 2.995A5.11 5.11 0 0 0 14 7.5a5.464 5.464 0 0 0-.213-1.5h-2.342c.032.331.055.664.055 1a10.114 10.114 0 0 1-.206 2h2.493c.095-.329.158-.665.19-1.005zm-3.535 0l.006-.051A9.04 9.04 0 0 0 10.5 7a8.994 8.994 0 0 0-.076-1H6.576A8.82 8.82 0 0 0 6.5 7a8.98 8.98 0 0 0 .233 2h3.534c.077-.332.135-.667.174-1.005zM10.249 5a8.974 8.974 0 0 0-1.255-2.97C8.83 2.016 8.666 2 8.5 2a3.62 3.62 0 0 0-.312.015l-.182.015L8 2.04A8.97 8.97 0 0 0 6.751 5h3.498zM5.706 5a9.959 9.959 0 0 1 .966-2.681A5.527 5.527 0 0 0 3.606 5h2.1zM3.213 6A5.48 5.48 0 0 0 3 7.5 5.48 5.48 0 0 0 3.213 9h2.493A10.016 10.016 0 0 1 5.5 7c0-.336.023-.669.055-1H3.213zm2.754 4h-2.36a5.515 5.515 0 0 0 3.819 2.893A10.023 10.023 0 0 1 5.967 10zM8.5 12.644A8.942 8.942 0 0 0 9.978 10H7.022A8.943 8.943 0 0 0 8.5 12.644zM11.033 10a10.024 10.024 0 0 1-1.459 2.893A5.517 5.517 0 0 0 13.393 10h-2.36z"/></svg>
        ),

        pos: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
            </svg>
        ),
        menu: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                />
            </svg>
        ),
        inventory: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4m0 0l4-4m0 0l4 4m-4-4v12"
                />
            </svg>
        ),
        gift: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
            </svg>
        ),
        subscription: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
            </svg>
        ),
        pending: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
        completed: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
        settings: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        ),
        support: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
        channel: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v2a1 1 0 01-1 1h-1v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8H3a1 1 0 01-1-1V5a1 1 0 011-1h4z"
                />
            </svg>
        ),
        services: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
            </svg>
        ),
        images: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
        ),
        modifiers: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                />
            </svg>
        ),
        categories: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
            </svg>
        ),
        options: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
            </svg>
        ),
        units: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
            </svg>
        ),
        attributes: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
            </svg>
        ),
        reports: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
            </svg>
        ),
        staff: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
            </svg>
        ),
        banking: (
            <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
            </svg>
        ),
    };

    return icons[type] || icons.overview;
};

export const sidebarData: SidebarItem[] = [
    {
        id: 'overview',
        label: 'Overview',
        icon: 'overview',
        path: '/',
    },
    {
        id: 'items',
        label: 'Items & services',
        icon: 'products',
        children: [
            {
                id: 'items-list',
                label: 'Items',
                icon: 'products',
                children: [
                    {
                        id: 'item-library',
                        label: 'Item library',
                        icon: 'products',
                        path: '/items/library',
                    },
                    {
                        id: 'channel-listing',
                        label: 'Channel listing',
                        icon: 'channel',
                        path: '/items/channels',
                    },
                    {
                        id: 'service-library',
                        label: 'Service library',
                        icon: 'services',
                        path: '/items/services',
                    },
                    {
                        id: 'image-library',
                        label: 'Image library',
                        icon: 'images',
                        path: '/items/images',
                    },
                    {
                        id: 'modifiers',
                        label: 'Modifiers',
                        icon: 'modifiers',
                        path: '/items/modifiers',
                    },
                    {
                        id: 'categories',
                        label: 'Categories',
                        icon: 'categories',
                        path: '/items/categories',
                    },
                    {
                        id: 'discounts',
                        label: 'Discounts',
                        icon: 'discounts',
                        path: '/items/discounts',
                    },
                    {
                        id: 'options',
                        label: 'Options',
                        icon: 'options',
                        path: '/items/options',
                    },
                    {
                        id: 'units',
                        label: 'Units',
                        icon: 'units',
                        path: '/items/units',
                    },
                    {
                        id: 'custom-attributes',
                        label: 'Custom attributes',
                        icon: 'attributes',
                        path: '/items/attributes',
                    },
                    {
                        id: 'settings2',
                        label: 'Settings',
                        icon: 'settings',
                        path: '/items/settings',
                        children: [
                            {
                                id: 'item-defaults',
                                label: 'Item defaults',
                                icon: 'settings',
                                path: '/items/settings/item-defaults',
                            },
                            {
                                id: 'dining-options',
                                label: 'Dining options',
                                icon: 'settings',
                                path: '/items/settings/dining-options',
                            },
                            {
                                id: 'comp-void',
                                label: 'Comp and void',
                                icon: 'settings',
                                path: '/items/settings/comp-void',
                            },
                            {
                                id: 'inventory',
                                label: 'Inventory',
                                icon: 'settings',
                                path: '/items/settings/inventory',
                            },
                            {
                                id: 'payment-links',
                                label: 'Payment links',
                                icon: 'settings',
                                path: '/items/settings/payment-links',
                            },
                        ],
                    },
                ],
            },
            {
                id: 'menus',
                label: 'Menus',
                icon: 'menu',
                path: '/items/menus',
            },
            {
                id: 'inventory',
                label: 'Inventory management',
                icon: 'inventory',
                path: '/items/inventory',
            },
            {
                id: 'gift-cards',
                label: 'Gift cards',
                icon: 'gift',
                path: '/items/gift-cards',
            },
            {
                id: 'subscriptions',
                label: 'Subscription plans',
                icon: 'subscription',
                path: '/items/subscriptions',
            },
        ],
    },
    {
        id: 'payments',
        label: 'Payments & invoices',
        icon: 'payment',
        children: [
            {
                id: 'transactions',
                label: 'Transactions',
                icon: 'payment',
                path: '/payments/transactions',
            },
            {
                id: 'payments-orders',
                label: 'Orders',
                icon: 'orders',
                children: [
                    {
                        id: 'all-orders',
                        label: 'All orders',
                        icon: 'orders',
                        path: '/payments/orders',
                    },
                    {
                        id: 'deliveries',
                        label: 'Deliveries',
                        icon: 'orders',
                        path: '/payments/orders/deliveries',
                    },
                    {
                        id: 'order-partners',
                        label: 'Order partners',
                        icon: 'orders',
                        path: '/payments/orders/partners',
                    },
                    {
                        id: 'fulfilment-settings',
                        label: 'Fulfilment settings',
                        icon: 'settings',
                        path: '/payments/orders/fulfilment-settings',
                    },
                    {
                        id: 'instant-payouts',
                        label: 'Instant payouts',
                        icon: 'payments',
                        path: '/payments/orders/instant-payouts',
                    },
                ],
            },
            {
                id: 'payments-invoices',
                label: 'Invoices',
                icon: 'payments',
                children: [
                    {
                        id: 'invoices-overview',
                        label: 'Overview',
                        icon: 'payments',
                        path: '/payments/invoices/overview',
                    },
                    {
                        id: 'projects',
                        label: 'Projects',
                        icon: 'payments',
                        path: '/payments/invoices/projects',
                    },
                    {
                        id: 'invoices',
                        label: 'Invoices',
                        icon: 'payments',
                        path: '/payments/invoices/invoices',
                    },
                    {
                        id: 'recurring-series',
                        label: 'Recurring series',
                        icon: 'payments',
                        path: '/payments/invoices/recurring-series',
                    },
                    {
                        id: 'estimates',
                        label: 'Estimates',
                        icon: 'payments',
                        path: '/payments/invoices/estimates',
                    },
                    {
                        id: 'reports',
                        label: 'Reports',
                        icon: 'payments',
                        path: '/payments/invoices/reports',
                    },
                    {
                        id: 'apps',
                        label: 'Apps',
                        icon: 'apps',
                        path: '/payments/invoices/apps',
                    },
                ],
            },
            {
                id: 'virtual-terminal',
                label: 'Virtual terminal',
                icon: 'payments',
                children: [
                    {
                        id: 'virtual-terminal-overview',
                        label: 'Overview',
                        icon: 'payments',
                        path: '/payments/virtual-terminal/overview',
                    },
                    {
                        id: 'virtual-terminal-settings',
                        label: 'Settings',
                        icon: 'settings',
                        path: '/payments/virtual-terminal/settings',
                    },
                ],
            },
            {
                id: 'payment-links',
                label: 'Payment links',
                icon: 'payments',
                children: [
                    {
                        id: 'payment-links-main',
                        label: 'Payment links',
                        icon: 'payments',
                        path: '/payments/payment-links',
                    },
                    {
                        id: 'payment-links-settings',
                        label: 'Settings',
                        icon: 'settings',
                        path: '/payments/payment-links/settings',
                    },
                ],
            },
            {
                id: 'subscriptions',
                label: 'Subscriptions',
                icon: 'subscription',
                path: '/payments/subscriptions',
            },
            {
                id: 'disputes',
                label: 'Disputes',
                icon: 'payments',
                path: '/payments/disputes',
            },
            {
                id: 'risk-manager',
                label: 'Risk manager',
                icon: 'payments',
                path: '/payments/risk-manager',
            },
        ],
    },
    {
        id: 'customers',
        label: 'Customers',
        icon: 'customers',
        path: '/customers',
    },
    {
        id: 'online',
        label: 'Online',
        icon: 'online',
        path: '/online',
    },
    {
        id: 'reports',
        label: 'Reports',
        icon: 'reports',
        path: '/reports',
    },
    {
        id: 'staff',
        label: 'Staff',
        icon: 'staff',
        path: '/staff',
    },
    {
        id: 'banking',
        label: 'Banking',
        icon: 'banking',
        path: '/banking',
    },
    // {
    //     id: 'marketing',
    //     label: 'Marketing',
    //     icon: 'marketing',
    //     path: '/marketing',
    // },

    {
        id: 'settings',
        label: 'Settings',
        icon: 'settings',
        children: [
            {
                id: 'account-settings',
                label: 'Account & Settings',
                children: [
                    {
                        id: 'my-business',
                        label: 'My business',
                        children: [
                            {
                                id: 'about',
                                label: 'About',
                                icon: 'chevron-right',
                                path: '/settings/business/about',
                            },
                            {
                                id: 'security',
                                label: 'Security',
                                icon: 'chevron-right',
                                path: '/settings/business/security',
                            },
                            {
                                id: 'locations',
                                label: 'Locations',
                                icon: 'chevron-right',
                                path: '/settings/business/locations',
                            }
                        ],
                    },
                    {
                        id: 'pricing-subscriptions',
                        label: 'Pricing & subscriptions',
                        icon: 'chevron-right',
                        path: '/settings/account/pricing',
                    }
                ],
            },
            {
                id: 'open-tickets',
                label: 'Open tickets',
                icon: 'ticket',
                path: '/settings/tickets',
            }
        ],
    }



    // {
    //     id: 'settings',
    //     label: 'Settings',
    //     icon: 'settings',
    //     children: [
    //         {
    //             id: 'settings-list',
    //             label: 'Account & Settings',
    //             icon: 'settings',
    //             children: [
    //                 {
    //                     id: 'personal-information',
    //                     label: 'Personal information',
    //                     icon: 'settings',
    //                     path: '/settings/library',
    //                 },
    //                 {
    //                     id: 'my-business',
    //                     label: 'My business',
    //                     icon: 'settings',
    //                     children: [
    //                         {
    //                             id: 'about',
    //                             label: 'About',
    //                             icon: 'settings',
    //                             path: '/items/settings/item-defaults',
    //                         },
    //                         {
    //                             id: 'security',
    //                             label: 'Security',
    //                             icon: 'settings',
    //                             path: '/items/settings/dining-options',
    //                         },
    //                         {
    //                             id: 'location',
    //                             label: 'Locations',
    //                             icon: 'settings',
    //                             path: '/settings/locations',
    //                         },
    //                     ],
    //                 },
    //                 {
    //                     id: 'pricing-subscriptions',
    //                     label: 'Pricing & subscriptions',
    //                     icon: 'settings',
    //                     path: '/items/services',
    //                 },
    //                 {
    //                     id: 'payments',
    //                     label: 'Payments',
    //                     icon: 'settings',
    //                     path: '/items/images',
    //                 },
    //                 {
    //                     id: 'banking',
    //                     label: 'Banking',
    //                     icon: 'settings',
    //                     path: '/items/modifiers',
    //                 },
    //                 {
    //                     id: 'notifications',
    //                     label: 'Notifications',
    //                     icon: 'settings',
    //                     path: '/items/categories',
    //                 },
    //                 {
    //                     id: 'tax-forms',
    //                     label: 'Tax forms',
    //                     icon: 'settings',
    //                     path: '/items/discounts',
    //                 },
    //                 {
    //                     id: 'ccpa',
    //                     label: 'CCPA',
    //                     icon: 'settings',
    //                     path: '/items/options',
    //                 },
    //                 {
    //                     id: 'fullfilment-methods',
    //                     label: 'Fullfilment methods',
    //                     icon: 'settings',
    //                     path: '/items/units',
    //                 },
    //                 {
    //                     id: 'hardware',
    //                     label: 'Hardware',
    //                     icon: 'settings',
    //                     path: '/items/attributes',
    //                     children: [
    //                         {
    //                             id: 'order-hardware',
    //                             label: 'Order hardware',
    //                             icon: 'settings',
    //                             path: '/items/settings/item-defaults',
    //                         },
    //                         {
    //                             id: 'my-orders',
    //                             label: 'My orders',
    //                             icon: 'settings',
    //                             path: '/items/settings/dining-options',
    //                         },
    //                     ],
    //                 },
    //                 {
    //                     id: 'iformation-requests',
    //                     label: 'Information request',
    //                     icon: 'settings',
    //                     path: '/items/settings',
    //                 },
    //             ],
    //         },

    //     ],
    // },




];

export default sidebarData;
