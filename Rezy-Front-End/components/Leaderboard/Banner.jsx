import React from 'react'
const Banner = () => {
    return (
        <div className="relative w-full">
            {/* Banner Section */}
            <div className='hidden sm:relative sm:flex sm:w-full'>
                <div className="flex" style={{ height: '250px', overflow: 'hidden' }}>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center ">
                        <div className="text-center">
                            <div className="w-full sm:max-w-6xl mx-auto sm:px-6 lg:px-8">
                                <div className="mx-auto max-w-lg text-center">
                                    <h2 className="text-xl font-bold sm:text-4xl text-white dark:text-white">Rezy Tournament Prizes</h2>
                                    <h3 className="text-xl font-bold sm:text-3xl text-clr-1 dark:text-clr-2 italic">Compete with your friends to win!</h3>
                                    <p className="mt-4 text-base text-white dark:text-white" style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                                        Rezy let's you win the best Prizes
                                    </p>
                                    {/* //add emojis and three prizes 1000 ASTAR, 100 ASTAR, 10 ASTAR  */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Banner