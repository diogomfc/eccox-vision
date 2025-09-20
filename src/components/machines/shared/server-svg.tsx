// src/components/icons/ServerSvg.tsx
import React, { SVGProps } from "react";
import clsx from "clsx";
import { StatusType } from "@/types/machines";

type ServerSvgProps = SVGProps<SVGSVGElement> & {
    status?: StatusType;
    className?: string;
};

const ServerSvg: React.FC<ServerSvgProps> = ({ status = "offline", className, ...props }) => {
    const statusColor = {
        Concluida: "#4AE5B6",
        "Em andamento": "#FBBF24",
        Pendente: "#EF4343",
        offline: "#9CA3AF",
    }[status];

    const glowColor = {
        Concluida: "bg-emerald-400/30",
        "Em andamento": "bg-orange-400/30",
        Pendente: "bg-red-400/30",
        offline: "bg-gray-500/20",
    }[status];

    const glowAnimation = {
        Concluida: "pulse-slow",
        "Em andamento": "pulse-slow",
        Pendente: "pulse-strong",
        offline: "pulse-slow",
    }[status];

    return (
        <div className="relative w-[169px] h-[305px]">
            {/* SVG do servidor */}

            <svg
                width={169}
                height={305}
                viewBox="0 0 169 305"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
                {...props}
            >
                <g id="server-status-frente-concluida">
                    <g id="status">
                        <path
                            id="status-dinamico"
                            d="M16.7041 247.57L8.90332 290.787H160.249L151.967 247.57H16.7041Z"
                            stroke={statusColor}
                            strokeOpacity={0.5}
                        />
                        <ellipse
                            id="sobra-status-dinamico"
                            cx={78.3357}
                            cy={36.6093}
                            rx={78.3357}
                            ry={36.6093}
                            transform="matrix(-1 0 0 1 162.765 231.595)"
                            fill="url(#paint0_radial_415_552)"
                        />
                    </g>
                    <g id="mak">
                        <g id="header">
                            <path
                                id="Vector 627"
                                d="M0.34668 72.9578L2 64.0312L11.5 72.9578H0.34668Z"
                                fill="#252728"
                            />
                            <path
                                id="Vector 628"
                                d="M168.372 72.9578L166.5 62.0312L156 72.9578H168.372Z"
                                fill="#252728"
                            />
                            <path
                                id="Rectangle 34624192"
                                d="M19.999 0.5H148.718C153.415 0.5 157.407 3.93302 158.11 8.57715L166.135 61.5352C167.006 67.2832 162.556 72.4579 156.742 72.458H11.9746C6.16113 72.4578 1.71113 67.2831 2.58203 61.5352L10.6064 8.57715C11.3101 3.93302 15.3019 0.5 19.999 0.5Z"
                                fill="url(#paint1_linear_415_552)"
                                stroke="#252728"
                            />
                            <path
                                id="Rectangle 34624193"
                                d="M142.437 18.6311C141.784 13.6541 137.542 9.93262 132.522 9.93262H37.7353C32.6869 9.93262 28.4303 13.6955 27.8109 18.7057L23.6912 52.03C22.9539 57.9941 27.6061 63.2569 33.6156 63.2569H136.897C142.936 63.2569 147.598 57.9438 146.811 51.9554L142.437 18.6311Z"
                                fill="#111112"
                            />
                        </g>
                        <path
                            id="Rectangle 34624199"
                            d="M167.655 73.6904L165.574 282.328H3.19238L0.851562 73.6904H167.655Z"
                            fill="url(#paint2_linear_415_552)"
                            stroke="#252728"
                        />
                    </g>
                    <g id="driver-5">
                        <g id="Rectangle 34624200" filter="url(#filter0_d_415_552)">
                            <path
                                d="M9.2334 81.5557L161.887 81.7781L161.386 105.604L9.62814 105.142L9.2334 81.5557Z"
                                fill="url(#paint3_linear_415_552)"
                            />
                            <path
                                d="M161.377 82.2773L160.896 105.102L10.1191 104.643L9.74121 82.0557L161.377 82.2773Z"
                                stroke="#252728"
                            />
                        </g>
                        <path
                            id="Rectangle 34624203"
                            d="M157.189 86.3857L156.746 101.441L14.2773 101.133L13.9277 86.2373L157.189 86.3857Z"
                            stroke="#3F5D7D"
                        />
                        <path
                            id="Rectangle 34624204"
                            d="M17.5977 89.3975L30.6673 89.4313L30.6244 93.057L17.6315 92.9866L17.5977 89.3975Z"
                            fill={statusColor}
                        />
                        <path
                            id="Rectangle 34624205"
                            d="M35.373 89.3975L48.4427 89.4313L48.3998 93.057L35.4068 92.9866L35.373 89.3975Z"
                            fill={statusColor}
                        />
                        <path
                            id="Rectangle 34624206"
                            d="M139.93 89.3975L152.999 89.4313L152.956 93.057L139.963 92.9866L139.93 89.3975Z"
                            fill={statusColor}
                        />
                        <g id="Group 427319884">
                            <circle
                                id="Ellipse 334"
                                cx={151.43}
                                cy={97.2383}
                                r={1.56836}
                                fill="#3E515A"
                            />
                            <circle
                                id="Ellipse 335"
                                cx={146.202}
                                cy={97.2383}
                                r={1.56836}
                                fill="#3E515A"
                            />
                            <circle
                                id="Ellipse 336"
                                cx={140.974}
                                cy={97.2383}
                                r={1.56836}
                                fill="#3E515A"
                            />
                            <circle
                                id="Ellipse 337"
                                cx={135.746}
                                cy={97.2383}
                                r={1.56836}
                                fill="#3E515A"
                            />
                        </g>
                    </g>
                    <g id="driver-4">
                        <g id="Rectangle 34624200_2" filter="url(#filter1_d_415_552)">
                            <path
                                d="M9.2334 113.967L161.887 114.189L161.386 138.015L9.62814 137.553L9.2334 113.967Z"
                                fill="url(#paint4_linear_415_552)"
                            />
                            <path
                                d="M161.377 114.688L160.896 137.513L10.1191 137.054L9.74121 114.467L161.377 114.688Z"
                                stroke="#252728"
                            />
                        </g>
                        <path
                            id="Rectangle 34624203_2"
                            d="M157.189 118.797L156.746 133.853L14.2773 133.544L13.9277 118.648L157.189 118.797Z"
                            stroke="#3F5D7D"
                        />
                        <path
                            id="Rectangle 34624204_2"
                            d="M17.5977 121.81L30.6673 121.843L30.6244 125.469L17.6315 125.399L17.5977 121.81Z"
                            fill={statusColor}
                        />
                        <path
                            id="Rectangle 34624205_2"
                            d="M35.373 121.81L48.4427 121.843L48.3998 125.469L35.4068 125.399L35.373 121.81Z"
                            fill={statusColor}
                        />
                        <path
                            id="Rectangle 34624206_2"
                            d="M139.93 121.81L152.999 121.843L152.956 125.469L139.963 125.399L139.93 121.81Z"
                            fill={statusColor}
                        />
                        <g id="Group 427319884_2">
                            <circle
                                id="Ellipse 334_2"
                                cx={151.43}
                                cy={129.651}
                                r={1.56836}
                                fill="#3E515A"
                            />
                            <circle
                                id="Ellipse 335_2"
                                cx={146.202}
                                cy={129.651}
                                r={1.56836}
                                fill="#3E515A"
                            />
                            <circle
                                id="Ellipse 336_2"
                                cx={140.974}
                                cy={129.651}
                                r={1.56836}
                                fill="#3E515A"
                            />
                            <circle
                                id="Ellipse 337_2"
                                cx={135.746}
                                cy={129.651}
                                r={1.56836}
                                fill="#3E515A"
                            />
                        </g>
                    </g>
                    <g id="driver-3">
                        <g id="Rectangle 34624200_3" filter="url(#filter2_d_415_552)">
                            <path
                                d="M9.2334 146.38L161.887 146.602L161.386 170.428L9.62814 169.966L9.2334 146.38Z"
                                fill="url(#paint5_linear_415_552)"
                            />
                            <path
                                d="M161.377 147.102L160.896 169.926L10.1191 169.467L9.74121 146.88L161.377 147.102Z"
                                stroke="#252728"
                            />
                        </g>
                        <path
                            id="Rectangle 34624203_3"
                            d="M157.189 151.211L156.746 166.267L14.2773 165.958L13.9277 151.062L157.189 151.211Z"
                            stroke="#3F5D7D"
                        />
                        <path
                            id="Rectangle 34624204_3"
                            d="M17.5977 154.223L30.6673 154.257L30.6244 157.882L17.6315 157.812L17.5977 154.223Z"
                            fill={statusColor}
                        />
                        <path
                            id="Rectangle 34624205_3"
                            d="M35.373 154.223L48.4427 154.257L48.3998 157.882L35.4068 157.812L35.373 154.223Z"
                            fill={statusColor}
                        />
                        <path
                            id="Rectangle 34624206_3"
                            d="M139.93 154.223L152.999 154.257L152.956 157.882L139.963 157.812L139.93 154.223Z"
                            fill={statusColor}
                        />
                        <g id="Group 427319884_3">
                            <circle
                                id="Ellipse 334_3"
                                cx={151.43}
                                cy={162.063}
                                r={1.56836}
                                fill="#3E515A"
                            />
                            <circle
                                id="Ellipse 335_3"
                                cx={146.202}
                                cy={162.063}
                                r={1.56836}
                                fill="#3E515A"
                            />
                            <circle
                                id="Ellipse 336_3"
                                cx={140.974}
                                cy={162.063}
                                r={1.56836}
                                fill="#3E515A"
                            />
                            <circle
                                id="Ellipse 337_3"
                                cx={135.746}
                                cy={162.063}
                                r={1.56836}
                                fill="#3E515A"
                            />
                        </g>
                    </g>
                    <g id="driver-2">
                        <g id="Rectangle 34624200_4" filter="url(#filter3_d_415_552)">
                            <path
                                d="M9.2334 178.794L161.887 179.016L161.386 202.842L9.62814 202.38L9.2334 178.794Z"
                                fill="url(#paint6_linear_415_552)"
                            />
                            <path
                                d="M161.377 179.516L160.896 202.34L10.1191 201.881L9.74121 179.294L161.377 179.516Z"
                                stroke="#252728"
                            />
                        </g>
                        <path
                            id="Rectangle 34624203_4"
                            d="M157.189 183.624L156.746 198.68L14.2773 198.371L13.9277 183.476L157.189 183.624Z"
                            stroke="#3F5D7D"
                        />
                        <path
                            id="Rectangle 34624204_4"
                            d="M17.5977 186.636L30.6673 186.67L30.6244 190.295L17.6315 190.225L17.5977 186.636Z"
                            fill={statusColor}
                        />
                        <path
                            id="Rectangle 34624205_4"
                            d="M35.373 186.636L48.4427 186.67L48.3998 190.295L35.4068 190.225L35.373 186.636Z"
                            fill={statusColor}
                        />
                        <path
                            id="Rectangle 34624206_4"
                            d="M139.93 186.636L152.999 186.67L152.956 190.295L139.963 190.225L139.93 186.636Z"
                            fill={statusColor}
                        />
                        <g id="Group 427319884_4">
                            <circle
                                id="Ellipse 334_4"
                                cx={151.43}
                                cy={194.477}
                                r={1.56836}
                                fill="#3E515A"
                            />
                            <circle
                                id="Ellipse 335_4"
                                cx={146.202}
                                cy={194.477}
                                r={1.56836}
                                fill="#3E515A"
                            />
                            <circle
                                id="Ellipse 336_4"
                                cx={140.974}
                                cy={194.477}
                                r={1.56836}
                                fill="#3E515A"
                            />
                            <circle
                                id="Ellipse 337_4"
                                cx={135.746}
                                cy={194.477}
                                r={1.56836}
                                fill="#3E515A"
                            />
                        </g>
                    </g>
                    <g id="driver-1">
                        <g id="Rectangle 34624200_5" filter="url(#filter4_d_415_552)">
                            <path
                                d="M8.18652 211.205L160.84 211.427L160.339 235.253L8.58127 234.791L8.18652 211.205Z"
                                fill="url(#paint7_linear_415_552)"
                            />
                            <path
                                d="M160.33 211.927L159.85 234.751L9.07227 234.292L8.69434 211.705L160.33 211.927Z"
                                stroke="#252728"
                            />
                        </g>
                        <path
                            id="Rectangle 34624203_5"
                            d="M156.144 216.035L155.7 231.091L13.2314 230.782L12.8818 215.887L156.144 216.035Z"
                            stroke="#3F5D7D"
                        />
                        <path
                            id="Rectangle 34624204_5"
                            d="M16.5508 219.047L29.6205 219.081L29.5776 222.706L16.5846 222.636L16.5508 219.047Z"
                            fill={statusColor}
                        />
                        <path
                            id="Rectangle 34624205_5"
                            d="M34.3262 219.047L47.3958 219.081L47.353 222.706L34.36 222.636L34.3262 219.047Z"
                            fill={statusColor}
                        />
                        <path
                            id="Rectangle 34624206_5"
                            d="M138.883 219.047L151.952 219.081L151.91 222.706L138.917 222.636L138.883 219.047Z"
                            fill={statusColor}
                        />
                        <g id="Group 427319884_5">
                            <circle
                                id="Ellipse 334_5"
                                cx={150.386}
                                cy={226.89}
                                r={1.56836}
                                fill="#3E515A"
                            />
                            <circle
                                id="Ellipse 335_5"
                                cx={145.157}
                                cy={226.89}
                                r={1.56836}
                                fill="#3E515A"
                            />
                            <circle
                                id="Ellipse 336_5"
                                cx={139.929}
                                cy={226.89}
                                r={1.56836}
                                fill="#3E515A"
                            />
                            <circle
                                id="Ellipse 337_5"
                                cx={134.701}
                                cy={226.89}
                                r={1.56836}
                                fill="#3E515A"
                            />
                        </g>
                    </g>
                    <g id="Vector" filter="url(#filter5_i_415_552)">
                        <path
                            d="M16.5498 245.709H27.0055V271.326H16.5498V245.709Z"
                            fill="#3D4246"
                        />
                        <path
                            d="M37.4615 245.709H47.9173V271.326H37.4615V245.709Z"
                            fill="#3D4246"
                        />
                        <path
                            d="M58.3733 245.709H68.3062V271.326H58.3733V245.709Z"
                            fill="#3D4246"
                        />
                        <path
                            d="M79.285 245.709H89.2179V271.326H79.285V245.709Z"
                            fill="#3D4246"
                        />
                        <path
                            d="M100.197 245.709H110.13V271.326H100.197V245.709Z"
                            fill="#3D4246"
                        />
                        <path
                            d="M120.586 245.709H131.041V271.326H120.586V245.709Z"
                            fill="#3D4246"
                        />
                        <path
                            d="M141.497 245.709H151.952V271.326H141.497V245.709Z"
                            fill="#3D4246"
                        />
                    </g>
                </g>
                <defs>
                    <filter
                        id="filter0_d_415_552"
                        x={5.2334}
                        y={81.5557}
                        width={160.653}
                        height={32.0479}
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity={0} result="BackgroundImageFix" />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset dy={4} />
                        <feGaussianBlur stdDeviation={2} />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_415_552"
                        />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_415_552"
                            result="shape"
                        />
                    </filter>
                    <filter
                        id="filter1_d_415_552"
                        x={5.2334}
                        y={113.967}
                        width={160.653}
                        height={32.0479}
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity={0} result="BackgroundImageFix" />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset dy={4} />
                        <feGaussianBlur stdDeviation={2} />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_415_552"
                        />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_415_552"
                            result="shape"
                        />
                    </filter>
                    <filter
                        id="filter2_d_415_552"
                        x={5.2334}
                        y={146.38}
                        width={160.653}
                        height={32.0479}
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity={0} result="BackgroundImageFix" />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset dy={4} />
                        <feGaussianBlur stdDeviation={2} />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_415_552"
                        />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_415_552"
                            result="shape"
                        />
                    </filter>
                    <filter
                        id="filter3_d_415_552"
                        x={5.2334}
                        y={178.794}
                        width={160.653}
                        height={32.0479}
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity={0} result="BackgroundImageFix" />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset dy={4} />
                        <feGaussianBlur stdDeviation={2} />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_415_552"
                        />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_415_552"
                            result="shape"
                        />
                    </filter>
                    <filter
                        id="filter4_d_415_552"
                        x={4.18652}
                        y={211.205}
                        width={160.653}
                        height={32.0479}
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity={0} result="BackgroundImageFix" />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset dy={4} />
                        <feGaussianBlur stdDeviation={2} />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_415_552"
                        />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_415_552"
                            result="shape"
                        />
                    </filter>
                    <filter
                        id="filter5_i_415_552"
                        x={16.5498}
                        y={245.709}
                        width={137.402}
                        height={27.6162}
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity={0} result="BackgroundImageFix" />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                        />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset dx={2} dy={2} />
                        <feGaussianBlur stdDeviation={2} />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="shape"
                            result="effect1_innerShadow_415_552"
                        />
                    </filter>
                    <radialGradient
                        id="paint0_radial_415_552"
                        cx={0}
                        cy={0}
                        r={1}
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(78.3357 36.6093) rotate(90) scale(36.6093 78.3357)"
                    >
                        <stop offset={0.296875} stopColor={statusColor} stopOpacity={0.5} />
                        <stop offset={1} stopColor={statusColor} stopOpacity={0} />
                    </radialGradient>
                    <linearGradient
                        id="paint1_linear_415_552"
                        x1={84.3486}
                        y1={-0.0184737}
                        x2={84.3486}
                        y2={72.9585}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#1D1F24" />
                        <stop offset={1} stopColor="#323840" />
                    </linearGradient>
                    <linearGradient
                        id="paint2_linear_415_552"
                        x1={84.2431}
                        y1={73.1372}
                        x2={84.2431}
                        y2={283.469}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#31373F" />
                        <stop offset={1} stopColor="#323840" />
                    </linearGradient>
                    <linearGradient
                        id="paint3_linear_415_552"
                        x1={9.45018}
                        y1={93.5798}
                        x2={161.661}
                        y2={93.5798}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#1F2226" />
                        <stop offset={0.49} stopColor="#0F1013" />
                        <stop offset={1} stopColor="#1F2226" />
                    </linearGradient>
                    <linearGradient
                        id="paint4_linear_415_552"
                        x1={9.45018}
                        y1={125.991}
                        x2={161.661}
                        y2={125.991}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#1F2226" />
                        <stop offset={0.49} stopColor="#0F1013" />
                        <stop offset={1} stopColor="#1F2226" />
                    </linearGradient>
                    <linearGradient
                        id="paint5_linear_415_552"
                        x1={9.45018}
                        y1={158.404}
                        x2={161.661}
                        y2={158.404}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#1F2226" />
                        <stop offset={0.49} stopColor="#0F1013" />
                        <stop offset={1} stopColor="#1F2226" />
                    </linearGradient>
                    <linearGradient
                        id="paint6_linear_415_552"
                        x1={9.45018}
                        y1={190.818}
                        x2={161.661}
                        y2={190.818}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#1F2226" />
                        <stop offset={0.49} stopColor="#0F1013" />
                        <stop offset={1} stopColor="#1F2226" />
                    </linearGradient>
                    <linearGradient
                        id="paint7_linear_415_552"
                        x1={8.40331}
                        y1={223.229}
                        x2={160.614}
                        y2={223.229}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#1F2226" />
                        <stop offset={0.49} stopColor="#0F1013" />
                        <stop offset={1} stopColor="#1F2226" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Glow difuso animado */}
            <div className="absolute left-1/2 top-4/5 -translate-x-1/2 -translate-y-1/2 z-0">
                <div
                    className={clsx(
                        "w-40 h-12 rounded-full blur-3xl",
                        glowColor,
                        glowAnimation
                    )}
                />
            </div>
        </div>
    );
};

export default ServerSvg;
