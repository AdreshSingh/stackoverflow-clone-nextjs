import { Bookmark, Bot, Building, FileText, Home, MessageSquare, MessageSquareIcon, Tag, Trophy, User, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return (
        <div>
            <aside className={`top-13.25 w-48 lg:w-64 max-h-full min-h-screen bg-white shadow-sm border-r transition-transform duration-200 ease-in-out md:translate-x-0 ${isOpen ? "translate-x-0" : "translate-x-full"}   `}>
                <nav className="p-2 lg:p-4">
                    <ul className="space-y-1">
                        <li>
                            <Link
                                href="/"
                                className="flex items-center px-2 py-2 text-sm text-gray-700 rounded hover:bg-gray-100"
                            ><Home className="mr-2 size-4 lg:mr-3" />Home</Link>
                        </li>
                        <li>
                            <Link
                                href="/questions"
                                className="flex items-center px-2 py-2 text-sm text-gray-700 rounded hover:bg-gray-100"
                            ><MessageSquareIcon className="mr-2 size-4 lg:mr-3" />Questions</Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="flex items-center px-2 py-2 text-sm text-gray-700 rounded hover:bg-gray-100"
                            >
                                <Bot className="w-4 h-4 mr-2 lg:mr-3" />
                                AI Assist
                                <Badge variant="secondary" className="ml-auto text-xs">
                                    Labs
                                </Badge>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/tags"
                                className="flex items-center px-2 py-2 text-sm text-gray-700 rounded hover:bg-gray-100"
                            >
                                <Tag className="w-4 h-4 mr-2 lg:mr-3" />
                                Tags
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/users"
                                className="flex items-center px-2 py-2 text-sm text-gray-700 rounded hover:bg-gray-100"
                            >
                                <Users className="w-4 h-4 mr-2 lg:mr-3" />
                                Users
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="flex items-center px-2 py-2 text-sm text-gray-700 rounded hover:bg-gray-100"
                            >
                                <Bookmark className="w-4 h-4 mr-2 lg:mr-3" />
                                Saves
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="flex items-center px-2 py-2 text-sm text-gray-700 rounded hover:bg-gray-100"
                            >
                                <Trophy className="w-4 h-4 mr-2 lg:mr-3" />
                                Challenges
                                <Badge
                                    variant="secondary"
                                    className="ml-auto text-xs text-orange-800 bg-orange-100"
                                >
                                    NEW
                                </Badge>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="flex items-center px-2 py-2 text-sm text-gray-700 rounded hover:bg-gray-100"
                            >
                                <MessageSquare className="w-4 h-4 mr-2 lg:mr-3" />
                                Chat
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="flex items-center px-2 py-2 text-sm text-gray-700 rounded hover:bg-gray-100"
                            >
                                <FileText className="w-4 h-4 mr-2 lg:mr-3" />
                                Articles
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="#"
                                className="flex items-center px-2 py-2 text-sm text-gray-700 rounded hover:bg-gray-100"
                            >
                                <Building className="w-4 h-4 mr-2 lg:mr-3" />
                                Companies
                            </Link>
                        </li>
                    
        </ul>
                </nav >
            </aside >
        </div >
    )
}