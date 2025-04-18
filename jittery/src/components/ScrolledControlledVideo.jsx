'use client';

import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function ScrollControlledVideo({isNextDivExited}) {
	const ref = useRef(null);
	const [images, setImages] = useState([]);
	const isImagesLoaded = useRef(false);

	const { scrollYProgress } = useScroll({
		offset: ['100vh start', 'end 210vh'],
	});

	// Load images efficiently after the component mounts
	useEffect(() => {
		if (isImagesLoaded.current) return;
		const loadedImages = Array.from({ length: 250 }, (_, i) => {
			const img = new Image();
			img.src = `/images/${i + 1}.png`;
			return img;
		});
		setImages(loadedImages);
		isImagesLoaded.current = true;
	}, []);

	const render = useCallback(
		(index) => {
			if (images.length > 0 && ref.current) {
				const ctx = ref.current.getContext('2d');
				if (ctx) {
					ctx.clearRect(0, 0, ref.current.width, ref.current.height);
					ctx.drawImage(images[Math.min(index - 1, images.length - 1)], 0, 0, ref.current.width, ref.current.height);
				}
			}
		},
		[images]
	);

	const currentIndex = useTransform(scrollYProgress, [0, 1], [1, 250]);

	useMotionValueEvent(currentIndex, 'change', (latest) => {
		const roundedIndex = Math.round(latest);
		if (images.length > 0) render(roundedIndex);
	});

	useEffect(() => {
		if (images.length > 0) render(1);
	}, [images, render]);

	return (
		<div
			style={{
				height: '150vh',
				width: '100vw',
				backgroundColor: 'black',
				position: 'relative',
			}}
		>
			<div
				style={{
					position: isNextDivExited?'fixed':'relative',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<canvas
					width={1920}
					height={1080}
					ref={ref}
					style={{
						width: '100%',
						height: 'auto',
						objectFit: 'cover',
					}}
				/>
			</div>
		</div>
	);
}
