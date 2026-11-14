import React from 'react';

const page = async({params}) => {
    const {slug}= await params
    return (
        <div className='w-full max-w-6xl mx-auto bg-white rounded-2xl my-10  p-10'>
            <h1 className='text-[16px] font-bold'>
                    যেমন: ১২৩.৪৫:{slug}
            </h1>
        </div>
    );
};

export default page;