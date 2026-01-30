import { motion } from 'framer-motion';
import { Github, ArrowRight, Box, Users, Puzzle, Linkedin } from 'lucide-react';

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
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 flex items-center gap-2 font-bold text-xl tracking-tight text-white">
                        <img src="/favicon.png" alt="HiveCAD Logo" className="w-8 h-8" />
                        HiveCAD
                    </div>
                    <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
                        <a href="#vision" className="hover:text-white transition-colors">Vision</a>
                        <a href="#technology" className="hover:text-white transition-colors">Technology</a>
                        <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
                        <a href="#about" className="hover:text-white transition-colors">About</a>
                    </div>
                    <div>
                        <a
                            href="https://hivecad.org"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-slate-900 bg-white hover:bg-slate-100 transition-colors"
                        >
                            Launch App
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function Hero() {
    return (
        <div id="vision" className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                        className="max-w-2xl"
                    >
                        <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
                            Professional 3D CAD. <br />
                            <span className="text-slate-400">Entirely in your Browser.</span> <br />
                            <span className="text-blue-500">Open Source.</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
                            Collaborative, local-first, and extensible. Built for the future of Open Hardware engineering.
                        </motion.p>
                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                            <a href="https://hivecad.org" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-slate-900 bg-white hover:bg-slate-100 transition-transform hover:scale-105 active:scale-95 duration-200">
                                Launch App
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </a>
                            <a href="https://github.com/dafiiit/HiveCAD" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-transform leading-none hover:scale-105 active:scale-95 duration-200">
                                <Github className="mr-2 h-5 w-5" />
                                GitHub
                            </a>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-12 lg:mt-0 relative perspective-1000"
                    >
                        <div className="aspect-[4/3] rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center relative overflow-hidden group shadow-2xl shadow-blue-500/10">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-50 group-hover:opacity-100 transition-opacity" />

                            <img
                                src="/App Screenshot.png"
                                alt="HiveCAD App Screenshot"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function Features() {
    const features = [
        {
            title: "Local-First Architecture",
            description: "Focus on data privacy, local storage, and Git syncing. Your data stays with you.",
            icon: Box
        },
        {
            title: "Collaborative Design",
            description: "Motto: \"Bees together strong\". Real-time collaboration features designed for teams.",
            icon: Users
        },
        {
            title: "Plugin Ecosystem",
            description: "Kernel + Plugin architecture allowing custom tools like ROS integration and simulation.",
            icon: Puzzle
        }
    ];

    return (
        <section id="technology" className="py-24 bg-slate-900/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Built for Engineering</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        A modern foundation for open hardware development.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="p-8 rounded-2xl bg-slate-950 border border-slate-800/50 hover:border-slate-700 transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 text-slate-300 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-colors">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Roadmap() {
    return (
        <section id="roadmap" className="py-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-16 text-white">Roadmap</h2>

                <div className="relative ml-3 md:ml-0 space-y-12">
                    {/* Step 1 */}
                    <div className="relative pl-12 md:pl-0">
                        {/* Line Segment */}
                        <div className="absolute left-0 md:left-1/2 top-[5px] md:top-1/2 bottom-[-3rem] w-px bg-slate-800 -translate-x-1/2" />

                        <div className="md:flex items-center justify-between group">
                            <div className="hidden md:block w-5/12 text-right pr-8">
                                <h3 className="text-lg font-bold text-slate-200">Core Architecture</h3>
                                <p className="text-slate-400 text-sm mt-1">WASM, Replicad Kernel</p>
                            </div>
                            <div className="absolute left-[-5px] md:left-auto md:right-1/2 md:mr-[-5px] top-0 md:top-1/2 md:-translate-y-1/2 w-2.5 h-2.5 rounded-full bg-green-500 ring-4 ring-slate-950 z-10" />
                            {/* Mobile Text */}
                            <div className="md:hidden mb-2">
                                <h3 className="text-lg font-bold text-slate-200">Core Architecture</h3>
                                <p className="text-slate-400 text-sm">WASM, Replicad Kernel</p>
                            </div>
                            <div className="md:w-5/12 md:pl-8">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                                    Done
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative pl-12 md:pl-0">
                        {/* Line Segment */}
                        <div className="absolute left-0 md:left-1/2 top-[-3rem] bottom-[-3rem] w-px bg-slate-800 -translate-x-1/2" />

                        <div className="md:flex items-center justify-between group">
                            <div className="hidden md:block w-5/12 text-right pr-8">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                    In Progress
                                </span>
                            </div>
                            <div className="absolute left-[-5px] md:left-auto md:right-1/2 md:mr-[-5px] top-0 md:top-1/2 md:-translate-y-1/2 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-slate-950 z-10" />
                            <div className="md:w-5/12 md:pl-8">
                                <h3 className="text-lg font-bold text-slate-200">Basic Features</h3>
                                <p className="text-slate-400 text-sm mt-1">Sketches, Constraints, 3D Ops</p>
                            </div>
                            {/* Mobile Text */}
                            <div className="md:hidden mt-2">
                                <h3 className="text-lg font-bold text-slate-200">Basic Features</h3>
                                <p className="text-slate-400 text-sm">Sketches, Constraints, 3D Ops</p>
                                <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                    In Progress
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative pl-12 md:pl-0">
                        {/* Line Segment */}
                        <div className="absolute left-0 md:left-1/2 top-[-3rem] bottom-[calc(100%-5px)] md:bottom-1/2 w-px bg-slate-800 -translate-x-1/2" />

                        <div className="md:flex items-center justify-between group">
                            <div className="hidden md:block w-5/12 text-right pr-8">
                                <h3 className="text-lg font-bold text-slate-200">Ecosystem</h3>
                                <p className="text-slate-400 text-sm mt-1">Plugin Store, ROS Integration</p>
                            </div>
                            <div className="absolute left-[-5px] md:left-auto md:right-1/2 md:mr-[-5px] top-0 md:top-1/2 md:-translate-y-1/2 w-2.5 h-2.5 rounded-full bg-slate-700 ring-4 ring-slate-950 z-10" />
                            <div className="md:w-5/12 md:pl-8">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
                                    Future
                                </span>
                            </div>
                            {/* Mobile Text */}
                            <div className="md:hidden md:mt-0 mt-2">
                                <h3 className="text-lg font-bold text-slate-200">Ecosystem</h3>
                                <p className="text-slate-400 text-sm">Plugin Store, ROS Integration</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function About() {
    return (
        <section id="about" className="py-24 bg-slate-900/30 border-y border-slate-800/50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <span className="text-blue-500 font-medium tracking-wide uppercase text-sm">Created at TUM</span>
                <h2 className="mt-2 text-3xl font-bold text-white">David Metzler</h2>
                <div className="mt-6 flex justify-center">
                    <img
                        src="/Me.jpg"
                        alt="David Metzler"
                        className="w-32 h-32 rounded-full border-4 border-slate-800 object-cover shadow-xl"
                    />
                </div>
                <p className="mt-8 text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                    Mechanical Engineering Student at TU Munich. <br />
                    Fusing <span className="text-white font-medium">Robotics</span>, <span className="text-white font-medium">AI</span>, and <span className="text-white font-medium">CAD</span>.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <a
                        href="https://www.linkedin.com/in/david-metzler-2003/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 rounded-full bg-slate-800 text-white hover:bg-blue-600 transition-colors border border-slate-700 hover:border-blue-500"
                    >
                        <Linkedin className="w-5 h-5 mr-2" />
                        LinkedIn
                    </a>
                    <a
                        href="https://github.com/dafiiit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors border border-slate-700"
                    >
                        <Github className="w-5 h-5 mr-2" />
                        GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="py-12 border-t border-slate-800 bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center space-x-6">
                    <a href="https://github.com/dafiiit/HiveCAD" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <a href="#" className="text-slate-500 hover:text-white transition-colors">
                        <span className="sr-only">Discord</span>
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 127.14 96.36">
                            <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0,72.06,72.06,0,0,0,79.36,5.18,96.48,96.48,0,0,0,16.65,47.4,99.81,99.81,0,0,0,14.61,86.27l0,0,.19.23A105,105,0,0,0,44,96.36,75.64,75.64,0,0,0,50.7,84.15,86.1,86.1,0,0,1,28.8,76.54a5.24,5.24,0,1,1,3.22-9.67,93.45,93.45,0,0,0,62,0,5.24,5.24,0,1,1,3.22,9.67,86.1,86.1,0,0,1-21.9,7.6,73.57,73.57,0,0,0,6.7,12.21,105.09,105.09,0,0,0,31.43-12.06l.16-.2A99.81,99.81,0,0,0,110.36,47.4,96.48,96.48,0,0,0,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                        </svg>
                    </a>
                </div>

                <div className="flex items-center space-x-6 text-sm text-slate-500">
                    <a href="#" className="hover:text-slate-300 transition-colors">Imprint</a>
                    <span>Licensed under MIT</span>
                </div>

                <div className="text-sm text-slate-600">
                    Built for the Open Internet.
                </div>
            </div>
        </footer>
    );
}

