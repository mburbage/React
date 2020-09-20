import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

const errorPage = () => (
	<div>
		<h1>Oops, wrong</h1>
		<p>Go <Link href="/"><a>Back</a></Link></p>
	</div>
)

export default errorPage;