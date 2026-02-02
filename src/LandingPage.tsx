import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowRight, GitBranch, Puzzle, Linkedin, Zap, Download, Monitor, Apple, X, Copy } from 'lucide-react';

// Custom hook to fetch the latest release assets from GitHub
function useLatestRelease() {
    const [downloadUrls, setDownloadUrls] = useState<{
        windows: string;
        macos: string;
        linux: string;
        linuxDeb: string;
    } | null>(null);

    useEffect(() => {
        // Fetch all releases (including drafts) instead of just /latest
        fetch('https://api.github.com/repos/dafiiit/HiveCAD/releases')
            .then(res => res.json())
            .then(data => {
                // Get the most recent release (first in array)
                const latestRelease = Array.isArray(data) && data.length > 0 ? data[0] : null;
                if (!latestRelease) {
                    throw new Error('No releases found');
                }

                const assets = latestRelease.assets || [];
                const urls = {
                    windows: assets.find((a: any) => a.name.endsWith('.exe'))?.browser_download_url || '#',
                    macos: assets.find((a: any) => a.name.endsWith('.dmg'))?.browser_download_url || '#',
                    linux: assets.find((a: any) => a.name.endsWith('.AppImage'))?.browser_download_url || '#',
                    linuxDeb: assets.find((a: any) => a.name.endsWith('.deb'))?.browser_download_url || '#',
                };
                setDownloadUrls(urls);
            })
            .catch(error => {
                console.error('Failed to fetch latest release:', error);
                // Fallback to releases page
                setDownloadUrls({
                    windows: 'https://github.com/dafiiit/HiveCAD/releases',
                    macos: 'https://github.com/dafiiit/HiveCAD/releases',
                    linux: 'https://github.com/dafiiit/HiveCAD/releases',
                    linuxDeb: 'https://github.com/dafiiit/HiveCAD/releases',
                });
            });
    }, []);

    return downloadUrls;
}

function HexGrid() {
    // Using a Pointy-Topped Hexagon Grid
    const R = 30; // Radius (Size)
    const w = R * Math.sqrt(3); // Width of one hex
    const pHeight = 3 * R; // Vertical repeat distance

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Increased opacity from 0.03 to 0.2 for better visibility */}
            <svg className="w-full h-full opacity-[0.2]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern
                        id="hexagons"
                        width={w}
                        height={pHeight}
                        patternUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                    >
                        {/* Seamless Tiling Logic:
                           Draws the lines for the center hexagon and the connections to neighbors.
                           This creates a perfect honeycomb mesh.
                        */}
                        <path
                            d={`
                                M ${w / 2} 0 
                                L ${w / 2} ${R / 2} 
                                L ${w} ${R} 
                                L ${w} ${2 * R} 
                                L ${w / 2} ${2.5 * R} 
                                L ${w / 2} ${3 * R} 
                                M ${w / 2} ${2.5 * R} 
                                L 0 ${2 * R} 
                                L 0 ${R} 
                                L ${w / 2} ${R / 2}
                            `}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-blue-500/40"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hexagons)" />
            </svg>
        </div>
    );
}

function DimensionLine({ label, className }: { label: string, className?: string }) {
    return (
        <div className={`flex flex-col items-center gap-1 ${className}`}>
            <div className="flex items-center w-full gap-2">
                <div className="h-[1px] flex-1 bg-blue-500/50 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-blue-500 rotate-45" />
                </div>
                <span className="text-[10px] font-mono text-blue-400 whitespace-nowrap">{label}</span>
                <div className="h-[1px] flex-1 bg-blue-500/50 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-blue-500 rotate-45" />
                </div>
            </div>
        </div>
    );
}

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

function MacInstructionsModal({ isOpen, onClose, downloadUrl }: { isOpen: boolean, onClose: () => void, downloadUrl: string }) {
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText("xattr -cr /Applications/HiveCAD.app");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-lg w-full relative shadow-2xl"
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>

                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Apple className="w-5 h-5" />
                    macOS Installation
                </h3>

                <div className="space-y-4 text-sm text-slate-300">
                    <p>
                        Since HiveCAD is currently in prototype, the app is not yet notarized by Apple. You may see a warning that the app is "damaged" or cannot be opened.
                    </p>

                    <ol className="list-decimal list-inside space-y-2 marker:text-blue-500">
                        <li>Download and drag <strong>HiveCAD.app</strong> to your <strong>Applications</strong> folder.</li>
                        <li>Open the <strong>Terminal</strong> app (Cmd+Space, type "Terminal").</li>
                        <li>Run the following command to remove the quarantine flag:</li>
                    </ol>

                    <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs flex items-center justify-between group relative">
                        <code className="text-blue-400 break-all mr-2">xattr -cr /Applications/HiveCAD.app</code>
                        <button
                            onClick={handleCopy}
                            className="p-1.5 hover:bg-slate-800 rounded transition-colors text-slate-500 hover:text-white shrink-0 flex items-center gap-1"
                            title="Copy to clipboard"
                        >
                            {copied ? <span className="text-green-500 font-sans font-bold">✓</span> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>

                    <p className="text-xs text-slate-500 italic">
                        This command removes the security flag that prevents unsigned apps from running.
                    </p>
                </div>

                <div className="mt-8 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 rounded-full border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
                    >
                        Close
                    </button>
                    <a
                        href={downloadUrl}
                        onClick={onClose}
                        className="flex-1 px-4 py-2 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                        download
                    >
                        <Download className="w-4 h-4" />
                        Download App
                    </a>
                </div>
            </motion.div>
        </div>
    );
}

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden font-sans selection:bg-blue-500/30">
            <Navbar />
            <Hero />
            <Features />
            <Roadmap />
            <About />
            <Footer />
        </div>
    );
}

function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0 flex items-center gap-3 font-bold text-xl tracking-tight text-white group cursor-pointer">
                        <div className="w-10 hexagon-mask bg-slate-900 border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 p-1.5 transition-colors">
                            <img src="/favicon.png" alt="HiveCAD Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">HiveCAD</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-10 text-[10px] font-mono tracking-widest uppercase text-slate-400">
                        <a href="#vision" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                            <span className="text-blue-500/50">01.</span> Vision
                        </a>
                        <a href="#technology" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                            <span className="text-blue-500/50">02.</span> Tech
                        </a>
                        <a href="#roadmap" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                            <span className="text-blue-500/50">03.</span> Roadmap
                        </a>
                        <a href="#about" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                            <span className="text-blue-500/50">04.</span> About
                        </a>
                    </div>
                    <div>
                        <a
                            href="https://app.hivecad.org"
                            className="inline-flex items-center justify-center px-6 py-2 border border-blue-500/30 text-xs font-mono uppercase tracking-widest rounded-full text-blue-400 bg-blue-500/5 hover:bg-blue-500/10 transition-all hover:border-blue-500/60"
                        >
                            Try Prototype in Cloud
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}


function Hero() {
    const downloadUrls = useLatestRelease();
    const [showMacModal, setShowMacModal] = useState(false);

    return (
        <div id="vision" className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden perspective-2000">
            <HexGrid />
            <MacInstructionsModal
                isOpen={showMacModal}
                onClose={() => setShowMacModal(false)}
                downloadUrl={downloadUrls?.macos || '#'}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                        className="max-w-2xl relative"
                    >
                        <div className="absolute -top-10 -left-10 w-20 h-20 border-l border-t border-blue-500/20 pointer-events-none" />

                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6">
                            <Zap className="w-3 h-3" />
                            {/* Updated to reflect package.json version */}
                            <span>v0.1.0-ALPHA</span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
                            {/* "Professional" is a stretch; "Parametric" is factually true for Replicad */}
                            Parametric 3D CAD. <br />
                            <span className="text-slate-400">Git-Native Architecture.</span> <br />
                            <span className="text-blue-500">Open Source.</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
                            {/* "Local-first" removed; "Version-controlled" added to match VCSEngine.ts capabilities */}
                            Version-controlled, cloud-connected, and scriptable. Built for the future of Open Hardware engineering.
                        </motion.p>

                        {/* Download Buttons Section */}
                        <motion.div variants={fadeInUp} className="space-y-4">
                            {/* Primary CTA: Download for Desktop */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                {downloadUrls ? (
                                    <>
                                        <a
                                            href={downloadUrls.windows}
                                            download
                                            className="inline-flex items-center justify-center px-6 py-3 border border-blue-500/30 text-sm font-mono uppercase tracking-widest rounded-full text-blue-400 bg-blue-500/5 hover:bg-blue-500/10 transition-all hover:border-blue-500/60 shadow-lg shadow-blue-500/5 hover:scale-105 active:scale-95 duration-200"
                                        >
                                            <Monitor className="mr-2 h-4 w-4" />
                                            Windows
                                        </a>
                                        <button
                                            onClick={() => setShowMacModal(true)}
                                            className="inline-flex items-center justify-center px-6 py-3 border border-blue-500/30 text-sm font-mono uppercase tracking-widest rounded-full text-blue-400 bg-blue-500/5 hover:bg-blue-500/10 transition-all hover:border-blue-500/60 shadow-lg shadow-blue-500/5 hover:scale-105 active:scale-95 duration-200 cursor-pointer"
                                        >
                                            <Apple className="mr-2 h-4 w-4" />
                                            macOS
                                        </button>
                                        <a
                                            href={downloadUrls.linux}
                                            download
                                            className="inline-flex items-center justify-center px-6 py-3 border border-blue-500/30 text-sm font-mono uppercase tracking-widest rounded-full text-blue-400 bg-blue-500/5 hover:bg-blue-500/10 transition-all hover:border-blue-500/60 shadow-lg shadow-blue-500/5 hover:scale-105 active:scale-95 duration-200"
                                        >
                                            <Download className="mr-2 h-4 w-4" />
                                            Linux
                                        </a>
                                    </>
                                ) : (
                                    <div className="inline-flex items-center justify-center px-6 py-3 text-sm font-mono text-slate-500">
                                        Loading downloads...
                                    </div>
                                )}
                            </div>

                            {/* Secondary CTA: Cloud Version */}
                            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                                <a
                                    href="https://app.hivecad.org"
                                    className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-full text-slate-400 bg-slate-800/50 hover:bg-slate-700 border border-slate-700/50 transition-all hover:text-white"
                                >
                                    Try out the prototype in the cloud
                                    <ArrowRight className="ml-2 h-3 w-3" />
                                </a>
                                <a
                                    href="https://github.com/dafiiit/HiveCAD"
                                    className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-full text-slate-400 hover:text-white border border-slate-700/50 hover:border-slate-600 transition-all"
                                >
                                    <Github className="mr-2 h-4 w-4" />
                                    View on GitHub
                                </a>
                            </div>

                            {/* Download hint */}
                            <p className="text-xs text-slate-500 font-mono">
                                ⚡ Local-first recommended • Full performance • Offline capable
                            </p>
                        </motion.div>

                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, rotateY: 20, rotateX: 10, scale: 0.9 }}
                        animate={{ opacity: 1, rotateY: 0, rotateX: 0, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="mt-12 lg:mt-0 relative preserve-3d"
                    >
                        <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />

                        {/* Replaced fake FPS counters with actual tech specs */}
                        <div className="absolute -top-6 -right-6 z-20 bg-slate-900/80 backdrop-blur border border-slate-700 p-3 rounded-lg text-[10px] font-mono shadow-xl hidden md:block">
                            <div className="flex justify-between gap-4 mb-2">
                                <span className="text-slate-500">KERNEL:</span>
                                <span className="text-blue-400">OCCT-WASM</span>
                            </div>
                            <div className="flex justify-between gap-4">
                                <span className="text-slate-500">SYNC:</span>
                                <span className="text-green-500">OCTOKIT</span>
                            </div>
                        </div>

                        <div className="aspect-[4/3] rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center relative overflow-hidden group shadow-2xl shadow-blue-500/20 transition-transform duration-700 hover:scale-[1.02]">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-30" />

                            <img
                                src="/App Screenshot.png"
                                alt="HiveCAD App Screenshot"
                                className="w-full h-full object-cover rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity"
                            />

                            <div className="absolute inset-0 border border-white/5 pointer-events-none rounded-2xl" />
                        </div>
                        <DimensionLine label="Replicad Kernel" className="mt-8 w-full opacity-50 group-hover:opacity-100 transition-opacity" />
                    </motion.div>

                </div>
            </div>
        </div>
    );
}




function FeatureCard({ feature, idx }: { feature: any, idx: number }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative h-[320px] w-full perspective-1000 cursor-pointer group"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                className="w-full h-full preserve-3d relative"
            >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden rounded-2xl bg-slate-900/50 border border-slate-800/50 p-8 flex flex-col group-hover:border-blue-500/30 transition-all duration-300">
                    <div className="absolute top-4 right-4 text-[8px] font-mono text-slate-600 group-hover:text-blue-500/50 transition-colors">
                        {feature.coord}
                    </div>

                    <div className="w-14 hexagon-mask bg-slate-800 flex items-center justify-center mb-6 text-slate-300 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-all duration-300">
                        <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        {feature.title}
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 animate-pulse" />
                    </h3>
                    <p className="text-slate-400 leading-relaxed text-sm font-light">{feature.description}</p>

                    <div className="mt-auto pt-6 border-t border-slate-800 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none">Inspect Details</span>
                        <ArrowRight className="w-3 h-3 text-blue-500" />
                    </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rounded-2xl bg-slate-900 border border-blue-500/30 p-8 flex flex-col rotate-y-180 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient-x" />
                    <div className="absolute top-4 right-4 text-[8px] font-mono text-blue-500/30">
                        {feature.coord} [DET_VIEW]
                    </div>

                    <h3 className="text-xs font-mono text-blue-400 mb-4 uppercase tracking-[0.2em] border-b border-blue-500/20 pb-2 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        Technical_Spec
                    </h3>

                    <p className="text-slate-300 leading-relaxed text-[11px] font-mono">
                        {feature.detail}
                    </p>

                    <div className="mt-auto pt-4 flex justify-between items-center text-[8px] font-mono text-slate-600 uppercase">
                        <span>Status: Operational</span>
                        <span className="text-blue-500 animate-pulse">● Live_Kernel</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function Features() {
    const features = [
        {
            title: "Git-Native Architecture",
            description: "Your data lives in your GitHub repository. Full ownership, no database lock-in.",
            detail: "Built directly on the GitHub API. Projects are stored as human-readable JSON in your own repositories. Leveraging Git for version history, secure storage, and complete data sovereignty.",
            icon: Github,
            coord: "X: -112.70 | Y: 0.00"
        },
        {
            title: "Versioned Engineering",
            description: "Motto: \"Commit, don't overwrite\". Engineering-grade version control built-in.",
            detail: "Manage design iterations with true semantic versioning. Create feature branches for experiments, track history with commit messages, and snapshot your progress using the internal VCS engine.",
            icon: GitBranch,
            coord: "X: 000.00 | Y: 000.00"
        },
        {
            title: "Community Tool Library",
            description: "Expand the kernel with community-submitted parametric tools and generators.",
            detail: "Integrated extension browser to discover and install new capabilities. Built on a modular Tool Registry allowing developers to share custom parametric scripts and automations directly via GitHub.",
            icon: Puzzle,
            coord: "X: 112.70 | Y: 0.00"
        }
    ];

    return (
        <section id="technology" className="py-24 relative bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[10px] font-mono text-blue-500 mb-4 tracking-[0.2em]"
                    >
                        [ MODULE_INSIGHTS ]
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mb-4">Built for Engineering</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto font-light">
                        A modern foundation for open hardware development.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feature, idx) => (
                        <FeatureCard key={idx} feature={feature} idx={idx} />
                    ))}
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </section>
    );
}



function Roadmap() {
    return (
        <section id="roadmap" className="py-32 relative overflow-hidden bg-slate-950">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <div className="w-px h-24 bg-gradient-to-b from-blue-500/0 to-blue-500/50" />
                    <h2 className="text-3xl font-bold text-white tracking-tight uppercase font-mono mt-4">Development Cycle</h2>
                    <div className="text-[10px] font-mono text-slate-500 mt-2 mb-20">ITERATION_LOG :: 2026-NOW</div>
                </div>

                <div className="relative space-y-24">
                    {/* Vertical Beam */}
                    <div className="absolute left-4 md:left-1/2 -top-20 bottom-0 w-[1px] bg-gradient-to-b from-blue-500/50 via-slate-800 to-transparent md:-translate-x-1/2" />


                    {[
                        {
                            title: "Core Architecture",
                            detail: "React + Replicad (OCCT)", // More accurate than just "WASM"
                            status: "Operational", // "Done" sounds too final for 0.0.0
                            color: "bg-green-500",
                            side: "left"
                        },
                        {
                            title: "Modeling Engine",
                            detail: "Constraints, Snapping, Git Sync", // Matches SnappingEngine.ts and GitHubAdapter.ts
                            status: "Beta / In Progress",
                            color: "bg-blue-500",
                            side: "right"
                        },
                        {
                            title: "Community Ecosystem",
                            detail: "Tool Registry, Robotics/ROS2", // Matches your registry.ts
                            status: "Planned",
                            color: "bg-slate-700",
                            side: "left"
                        }
                    ].map((item, idx) => (
                        <div key={idx} className={`relative flex items-center md:justify-center ${item.side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                            <div className={`ml-12 md:ml-0 md:w-5/12 ${item.side === 'left' ? 'md:pr-12 md:text-right' : 'md:pl-12 text-left'}`}>

                                <motion.div
                                    initial={{ opacity: 0, x: item.side === 'left' ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/50 backdrop-blur group hover:border-blue-500/30 transition-all"
                                >
                                    <div className="text-[10px] font-mono text-blue-500 mb-2">{item.status}</div>
                                    <h3 className="text-lg font-bold text-white mb-1 tracking-tight">{item.title}</h3>
                                    <p className="text-slate-400 text-sm font-light">{item.detail}</p>

                                    <div className={`mt-4 h-px bg-slate-800 w-full relative ${item.side === 'left' ? 'origin-right' : 'origin-left'}`}>
                                        <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-slate-700 rotate-45" />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-500/5 blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 blur-[150px]" />
        </section>
    );
}


function About() {
    return (
        <section id="about" className="py-32 bg-slate-950 border-y border-white/5 relative">
            <HexGrid />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                >
                    <span className="text-blue-500 font-mono tracking-widest uppercase text-[10px] mb-4">ENGINEER_STATUS :: ACTIVE</span>
                    <h2 className="text-4xl font-bold text-white tracking-tight mb-8">David Metzler</h2>

                    <div className="relative mb-12">
                        <div className="w-40 hexagon-mask bg-blue-600/20 p-1">
                            <img
                                src="/Me.jpg"
                                alt="David Metzler"
                                className="w-full h-full object-cover hexagon-mask grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                        {/* Callouts */}
                        <div className="absolute -top-4 -right-12 hidden lg:block">
                            <DimensionLine label="θ=60°" className="w-24 rotate-[-30deg]" />
                        </div>

                    </div>

                    <p className="text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed mb-10">
                        Mechanical Engineering Student at <span className="text-white">TU Munich</span>. <br />
                        Fusing <span className="text-blue-400 font-mono text-xl">ROBOTICS</span>, <span className="text-blue-400 font-mono text-xl">AI</span>, and <span className="text-blue-400 font-mono text-xl">CAD</span>.
                    </p>

                    <div className="flex justify-center gap-6">
                        <a
                            href="https://www.linkedin.com/in/david-metzler-2003/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-2"
                        >
                            <div className="w-12 hexagon-mask bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all">
                                <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 group-hover:text-blue-500">LINKEDIN</span>
                        </a>
                        <a
                            href="https://github.com/dafiiit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-2"
                        >
                            <div className="w-12 hexagon-mask bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all">
                                <Github className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 group-hover:text-blue-500">GITHUB</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}


function Footer() {
    return (
        <footer className="py-24 border-t border-white/5 bg-slate-950 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center relative z-10">
                <div className="text-xl md:text-3xl font-mono text-slate-700 tracking-[0.5em] uppercase text-center">
                    Built for the Open Internet
                </div>
            </div>
        </footer>
    );
}
