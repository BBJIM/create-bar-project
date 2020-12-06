import styled, { keyframes } from 'styled-components';

const placeholderSkeleton = keyframes` {
	0% {
	  background-position: -100% 0;
	}
	100% {
	  background-position: 100% 0;
	}
  }`;

const Placeholder = styled.div`
	height: 100%;
	width: 100%;
	background-image: -webkit-linear-gradient(left, #f6f7f8 0%, #e4e4e4 20%, #f6f7f8 40%, #f6f7f8 100%);
	background-size: 200% 100%;
	animation: ${placeholderSkeleton} 1s linear infinite;
`;

export default Placeholder;
