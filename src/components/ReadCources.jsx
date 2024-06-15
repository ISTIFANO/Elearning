import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function ReadCourses() {
    const videoRef = useRef(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [videos, setVideos] = useState([]);
    const [videoDescription, setVideoDescription] = useState('');
    const [videoRating, setVideoRating] = useState('');

    useEffect(() => {
        axios.get('http://localhost/Backend/Cources/LMS_3/Elearning/src/php/ReadCources.php')
            .then(response => {
                if (response.data && Array.isArray(response.data)) {
                    setVideos(response.data);
                } else {
                    console.error('Invalid data format received from the server');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const playVideo = (video) => {
        if (videoRef.current) {
            videoRef.current.src = video.Path;
            videoRef.current.play();
            setVideoDescription(video.Description);
            setVideoRating(video.Rating);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 h-screen">
            <div className="w-full lg:w-1/3 bg-white dark:bg-zinc-900 overflow-y-auto">
                <div className="p-4 border-b border-zinc-300 dark:border-zinc-700">
                    <h2 className="text-xl font-semibold">Course content</h2>
                </div>
                <div className="p-4 space-y-4">
                    {videos.map(video => (
                        <div
                            key={video.ID_video}
                            className={`border-b border-zinc-300 dark:border-zinc-700 pb-4 cursor-pointer ${selectedCourse === video.ID_video ? 'bg-zinc-200 dark:bg-zinc-700' : ''}`}
                            onClick={() => {
                                setSelectedCourse(video.ID_video);
                                playVideo(video);
                            }}
                        >
                            <h3 className="text-lg font-medium">{video.Titre}</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">{video.Description}</p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Duration: {video.Duree}</p>
                            <button className="text-sm text-blue-600" onClick={() => playVideo(video)}>Watch Video</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full lg:w-2/3 p-4 bg-black">
                <video ref={videoRef} className="w-full h-full" controls>
                    <source src="" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {selectedCourse && (
                   <div className=" bottom-0 left-0 w-screen p-4 bg-gray-900 mt-8 bg-opacity-75 text-white">
                   <p className="text-lg">Description: {videoDescription}</p>
                   <p className="text-lg text-yellow-500">Rating: ⭐{videoRating}</p>
               </div>
                )}
            </div>
        </div>
    );
}
