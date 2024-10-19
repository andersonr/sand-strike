"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, User } from "lucide-react";
import { useState } from "react";

export function TopBar() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogin = () => setIsLoggedIn(true);
	const handleLogout = () => setIsLoggedIn(false);

	return (
		<header className="w-full border-b border-border/40 bg-orange-500/70 backdrop-blur supports-[backdrop-filter]:bg-orange-500/70">
			<div className="flex h-14 max-w-screen-3xl items-center">
				<div className="flex items-center space-x-2 ml-5">
					<LogoIcon />
					<span className="text-lg font-bold text-white">Sand Strike</span>
				</div>
				<div className="flex flex-1 items-center justify-end mr-5">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className="relative h-10 w-10 rounded-full border-2 border-white">
								<Avatar className="h-9 w-9">
									<AvatarImage src="/placeholder-avatar.jpg" alt="@user" />
									<AvatarFallback>U</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end" forceMount>
							<DropdownMenuItem>
								<User className="mr-2 h-4 w-4" />
								<span>Profile</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							{!isLoggedIn && (
								<DropdownMenuItem onSelect={handleLogin}>
									<LogIn className="mr-2 h-4 w-4" />
									<span>Log in</span>
								</DropdownMenuItem>
							)}
							{isLoggedIn && (
								<DropdownMenuItem onSelect={handleLogout}>
									<LogOut className="mr-2 h-4 w-4" />
									<span>Log out</span>
								</DropdownMenuItem>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}

function LogoIcon() {
	return (
		<svg
			fill="#000000"
			height="24"
			width="24"
			version="1.1"
			id="Capa_1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 490 490">
			<title>Sand strike brand name - A barbatana de um tubarão</title>
			<g>
				<path
					d="M393.395,342.163c-2.931-96.988-31.782-170.778-85.916-219.461c-79.884-71.806-184.496-61.633-188.909-61.125
		l-19.358,2.049l6.552,18.326c49.206,137.757,12.475,278.104,2.362,311.483c-31.184,9.406-56.536,7.28-86.703-22.255L0,393.081
		c27.211,26.643,52.628,36.112,77.894,36.112c28.737,0,57.295-12.267,88.067-25.491c35.469-15.244,75.68-32.522,127.695-37.788
		c127.919-13,167.966,54.064,169.611,56.921L490,407.876C488.579,405.303,463.114,361.128,393.395,342.163z M290.574,335.427
		c-56.712,5.745-101.067,24.803-136.7,40.122c-3.447,1.481-6.809,2.925-10.094,4.322c13.613-53.678,33.755-168.749-2.577-288.254
		c31.565,0.793,95.532,8.512,146.035,54.094c46.229,41.719,71.485,105.676,75.268,190.301
		C341.663,333.246,317.806,332.68,290.574,335.427z"
				/>
			</g>
		</svg>
	);
}
