import { FunctionComponent } from 'react';

const SocialProof:FunctionComponent = () => {
  	return (
    		<div className="w-full relative bg-gray flex flex-col items-center justify-start py-10 px-[140px] box-border gap-8 text-left text-base text-text-soft300 font-inter">
      			<div className="relative tracking-[-0.02em] leading-7">Backed by</div>
      			<div className="self-stretch flex flex-row items-center justify-center flex-wrap content-center gap-x-16 gap-y-10">
        				<div className="flex flex-row items-center justify-center gap-x-16 gap-y-10">
        					<div className="w-[143px] relative h-10 overflow-hidden shrink-0">
          						<img className="absolute top-[calc(50%_-_14.22px)] left-[calc(50%_-_70.84px)] w-[141.8px] h-[27.4px]" alt="" src="Vector.svg" />
        					</div>
        				</div>
      			</div>
    		</div>);
};

export default SocialProof;
