"use client";

export default function Loader() {
        return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 z-50 gap-5">
            <div className="w-12 h-12 border-4 border-[#298BFE] border-t-transparent rounded-full animate-spin"></div>
            <div className="text-[#3F5D7E] mt-4 text-lg">Carregando...</div>
        </div>
    );
}