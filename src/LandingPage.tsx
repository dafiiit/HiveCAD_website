import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowRight, Box, Users, Puzzle, Linkedin, Zap } from 'lucide-react';

function HexGrid() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <svg className="w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="hexagons" width="43.3" height="75" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                        <path
                            d="M21.65 0 L43.3 12.5 L43.3 37.5 L21.65 50 L0 37.5 L0 12.5 Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-blue-500"
                        />
                        <path
                            d="M21.65 75 L43.3 62.5 L43.3 37.5 M0 37.5 L0 62.5 L21.65 75"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-blue-500"
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
                        <div className="w-10 h-10 hexagon-mask bg-slate-900 border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 p-1.5 transition-colors">
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
                            href="https://hivecad.org"
                            className="inline-flex items-center justify-center px-6 py-2 border border-blue-500/30 text-xs font-mono uppercase tracking-widest rounded-full text-blue-400 bg-blue-500/5 hover:bg-blue-500/10 transition-all hover:border-blue-500/60"
                        >
                            Execute App
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}


function Hero() {
    return (
        <div id="vision" className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden perspective-2000">
            <HexGrid />
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
                            <span>V 1.0.42-PROTOTYPE</span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
                            Professional 3D CAD. <br />
                            <span className="text-slate-400">Entirely in your Browser.</span> <br />
                            <span className="text-blue-500">Open Source.</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
                            Collaborative, local-first, and extensible. Built for the future of Open Hardware engineering.
                        </motion.p>
                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                            <a href="https://hivecad.org" className="inline-flex items-center justify-center px-8 py-3 border border-blue-500/30 text-base font-mono uppercase tracking-widest rounded-full text-blue-400 bg-blue-500/5 hover:bg-blue-500/10 transition-all hover:border-blue-500/60 shadow-lg shadow-blue-500/5">
                                Execute App
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </a>
                            <a href="https://github.com/dafiiit/HiveCAD" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-transform leading-none hover:scale-105 active:scale-95 duration-200">
                                <Github className="mr-2 h-5 w-5" />
                                GitHub
                            </a>
                        </motion.div>

                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, rotateY: 20, rotateX: 10, scale: 0.9 }}
                        animate={{ opacity: 1, rotateY: 0, rotateX: 0, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="mt-12 lg:mt-0 relative preserve-3d"
                    >
                        <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />

                        {/* Technical Overlays */}
                        <div className="absolute -top-6 -right-6 z-20 bg-slate-900/80 backdrop-blur border border-slate-700 p-3 rounded-lg text-[10px] font-mono shadow-xl hidden md:block">
                            <div className="flex justify-between gap-4 mb-2">
                                <span className="text-slate-500">VX:</span>
                                <span className="text-blue-400">1,242</span>
                            </div>
                            <div className="flex justify-between gap-4">
                                <span className="text-slate-500">FPS:</span>
                                <span className="text-green-500">120.0</span>
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
                        <DimensionLine label="L = 42 mm" className="mt-8 w-full opacity-50 group-hover:opacity-100 transition-opacity" />
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

                    <div className="w-14 h-14 hexagon-mask bg-slate-800 flex items-center justify-center mb-6 text-slate-300 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-all duration-300">
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
            title: "Local-First Architecture",
            description: "Focus on data privacy, local storage, and Git syncing. Your data stays with you.",
            detail: "Built on SQLite-WASM and CRDTs. Every mutation is recorded locally first, then synced via P2P or Git backends. Complete offline autonomy for complex CAD workflows.",
            icon: Box,
            coord: "X: -112.70 | Y: 0.00"
        },
        {
            title: "Collaborative Design",
            description: "Motto: \"Bees together strong\". Real-time collaboration features designed for teams.",
            detail: "Multi-user cursors, live assembly synchronization, and versioned branches. Workspace state is shared via decentralized protocols ensuring no single point of failure in designs.",
            icon: Users,
            coord: "X: 000.00 | Y: 000.00"
        },
        {
            title: "Plugin Ecosystem",
            description: "Kernel + Plugin architecture allowing custom tools like ROS integration and simulation.",
            detail: "Isolated JS sandbox for custom scripts. Deep access to the Replicad kernel for direct geometry manipulation. Seamless integration with robot simulation and CAM pipelines.",
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
                    <div className="text-[10px] font-mono text-slate-500 mt-2 mb-20">ITERATION_LOG :: 2024-2025</div>
                </div>

                <div className="relative space-y-24">
                    {/* Vertical Beam */}
                    <div className="absolute left-4 md:left-1/2 -top-20 bottom-0 w-[1px] bg-gradient-to-b from-blue-500/50 via-slate-800 to-transparent md:-translate-x-1/2" />


                    {[
                        {
                            title: "Core Architecture",
                            detail: "WASM, Replicad Kernel",
                            status: "Done",
                            color: "bg-green-500",
                            side: "left"
                        },
                        {
                            title: "Basic Features",
                            detail: "Sketches, Constraints, 3D Ops",
                            status: "In Progress",
                            color: "bg-blue-500",
                            side: "right"
                        },
                        {
                            title: "Ecosystem",
                            detail: "Plugin Store, ROS Integration",
                            status: "Future",
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
                        <div className="w-40 h-40 hexagon-mask bg-blue-600/20 p-1">
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
                            <div className="w-12 h-12 hexagon-mask bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all">
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
                            <div className="w-12 h-12 hexagon-mask bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all">
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



