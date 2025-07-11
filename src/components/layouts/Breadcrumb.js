"use client";

import Link from "next/link";

export default function Breadcrumb(props) {
    return(
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <h2 className="text-3xl font-semibold">{props.title}</h2>
            <nav className="text-base font-medium text-gray-500 mt-2 md:mt-0" aria-label="Breadcrumb">
                <ol className="list-none p-0 inline-flex">
                    <li className="flex items-center">
                        <Link href="/" className="text-emerald-600 hover:text-emerald-800">Home</Link>
                        <svg className="fill-current w-3 h-3 mx-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 72.257c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                    </li>
                    <li className="flex items-center">
                        <Link href={props.link} className="text-gray-700 hover:text-gray-900">{props.title}</Link>
                    </li>
                </ol>
            </nav>
        </div>
    );
}