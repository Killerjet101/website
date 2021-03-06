import React, {useReducer} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {GetStaticProps} from 'next';
import {
	SiAmazonaws,
	SiDocker,
	SiGit,
	SiGithub,
	SiDiscord,
	SiJava,
	SiPython,
	SiHtml5,
	SiCss3,
	SiMongodb,
	SiFirebase,
	SiNextdotjs as SiNextDotJs,
	SiNodedotjs as SiNodeDotJs,
	SiReact,
	SiTwitter,
	SiTypescript,
	SiYarn,
	SiBlender,
} from 'react-icons/si';
import {GiSkateboard} from 'react-icons/gi';
import {
	Data as LanyardData,
	LanyardError,
	LanyardResponse,
	useLanyard,
} from 'use-lanyard';
import {PinnedRepo, useGitHubPinnedRepos} from '../hooks/github';
import {ListItem} from '../components/list-item';
import {DISCORD_ID} from '../components/song';
import {age} from '../util/time';
import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface Props {
	pinnedRepos: PinnedRepo[];
	lanyard: LanyardData;
}

export default function Index(props: Props) {
	const {data: projects = props.pinnedRepos} = useGitHubPinnedRepos('Killerjet101');

	const {data: lanyard} = useLanyard(DISCORD_ID, {
		fallbackData: props.lanyard,
	});

	const boostedActivity = lanyard?.activities.find(
		activity => activity.application_id === '932730208820265011',
	);

	return (
		<>
			<div className='space-y-4'>
				<div className='flex items-center space-x-3'>
					<a
						href='https://github.com/Killerjet101'
						target='_blank'
						rel='noreferrer'
						aria-label='GitHub Profile'
					>
						<SiGithub className='w-7 h-7' />
						<span className='sr-only'>GitHub Profile</span>
					</a>

					<a
						href='https://twitter.com/Killerjet101'
						target='_blank'
						rel='noreferrer'
						aria-label='Twitter Profile'
					>
						<SiTwitter className='w-7 h-7' />
						<span className='sr-only'>Twitter Profile</span>
					</a>
				</div>

				<h1 className='text-3xl font-bold sm:text-4xl md:text-6xl'>
					Hey, I'm{' '}
					<span className='text-blue-700 dark:text-white'>Jet</span> ✌️
				</h1>

				<p className='opacity-80'>
					I'm a ~{age.toPrecision(4)} year old software engineer from the United
					States. I'm interested in full stack web development including large
					scale frontend applications and performant serverside code.
				</p>
			</div>

			<div className='space-y-4'>
				<h1 className='text-2xl font-bold sm:text-3xl'>What do I do? 💭</h1>
				<p className='opacity-80'>
					Honestly, a few too many things to count on one hand... I'm currently
					having a fantastic time working with{' '}
					<a href='https://hop.io' target='_blank' rel='noreferrer'>
						Hop
					</a>{' '}
					- we're building an e2e realtime engine for video. Below are some of
					the more popular open source projects I've worked on. In total, the
					following repos have earnt me{' '}
					{projects.reduce(
						(acc, project) => acc + parseInt(project.stars, 10),
						0,
					)}{' '}
					stars! Thank you! 💖
				</p>

				<div className='grid grid-cols-1 auto-cols-max gap-1 sm:grid-cols-2 sm:gap-3'>
					{projects.map(project => (
						<ProjectCard key={project.repo} repo={project} />
					))}
				</div>
			</div>

			<div className='space-y-4'>
				<h1 className='text-2xl font-bold sm:text-3xl'>Technologies 💻</h1>

				<p className='opacity-80'>
					I use a wide range of tools to tackle each hurdle in the most
					efficient manner possible. I really love working with containersation,
					especially Docker; it's proven to be a reliable bit of kit for both
					production and development environments.
				</p>

				<ul className='grid grid-cols-3 gap-4 sm:grid-cols-4'>
					<ListItem icon={SiDocker} text='Docker' />
					<ListItem icon={SiNodeDotJs} text='Node.js' />
					<ListItem icon={SiJava} text='Java' />
					<ListItem icon={SiTypescript} text='TypeScript' />
					<ListItem icon={SiPython} text='Python' />
					<ListItem icon={SiHtml5} text='HTML' />
					<ListItem icon={SiCss3} text='CSS' />
					<ListItem icon={SiReact} text='React.js' />
					<ListItem icon={SiNextDotJs} text='Next.js' />
					<ListItem icon={SiDiscord} text='Discord.js' />
					<ListItem icon={SiYarn} text='Yarn' />
					<ListItem icon={SiAmazonaws} text='AWS' />
					<ListItem icon={SiGit} text='Git' />
					<ListItem icon={SiMongodb} text='MongoDB' />
					<ListItem icon={SiFirebase} text='Firebase' />
					<ListItem icon={SiBlender} text='Blender' />
				</ul>
			</div>
		</>
	);
}

function ProjectCard({repo: project}: {repo: PinnedRepo}) {
	const [isOpen, toggle] = useReducer(x => !x, false);

	return (
		<motion.div
			animate={{height: isOpen ? 'auto' : '54px'}}
			className='flex overflow-hidden relative flex-col text-blue-900/80 dark:text-gray-100 no-underline dark:hover:bg-white/10 bg-gradient-to-tr from-blue-100 dark:from-white/5 to-blue-700/5 dark:to-white/5 rounded-md dark:border border-white/10 md:rounded-lg'
		>
			<button
				type='button'
				className='flex items-center py-4 px-5 space-x-2 text-lg font-bold border-b border-white/10 focus:outline-none cursor-pointer select-none'
				onClick={toggle}
			>
				<div className='flex flex-1 items-center space-x-2 text-left'>
					<span>{project.repo}</span>
					<span className='flex items-center space-x-3 text-xs'>
						<span className='space-x-1'>
							<span>⭐</span>
							<span>{project.stars}</span>
						</span>
						<span className='space-x-1'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='inline w-4 h-4'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
								/>
							</svg>
							<span>{project.forks}</span>
						</span>
					</span>
				</div>
				<div>
					<motion.div
						className='p-1 bg-white/0 hover:bg-white/10 rounded-full'
						animate={{rotate: isOpen ? 90 : 0}}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='w-5 h-5'
							viewBox='0 0 20 20'
							fill='currentColor'
						>
							<path
								fillRule='evenodd'
								d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
								clipRule='evenodd'
							/>
						</svg>
					</motion.div>
				</div>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						className='flex h-full'
					>
						<div className='flex flex-col py-4 px-5 space-y-4'>
							<p className='flex-1'>{project.description}</p>

							<div>
								<a
									href={`https://github.com/${project.owner}/${project.repo}`}
									target='_blank'
									rel='noreferrer'
									className='inline-flex items-center py-2 px-6 space-x-2 text-white no-underline bg-blue-700 dark:bg-white/10 rounded-full transition-transform duration-500 hover:scale-95 select-none'
								>
									<span>View Project</span>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='w-6 h-6'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
										/>
									</svg>
								</a>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}

export const getStaticProps: GetStaticProps<Props> = async function () {
	const pinnedRepos = await fetch(
		'https://gh-pinned-repos.egoist.sh/?username=Killerjet101',
	).then(async response => response.json() as Promise<PinnedRepo[]>);

	const lanyard = await fetch(
		`https://api.lanyard.rest/v1/users/${DISCORD_ID}`,
	);

	const lanyardBody = (await lanyard.json()) as LanyardResponse;

	if ('error' in lanyardBody) {
		throw new LanyardError(lanyard.status, lanyardBody.error.message);
	}

	return {
		props: {pinnedRepos, lanyard: lanyardBody.data},
		revalidate: 120,
	};
};
