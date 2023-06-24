import { Pagination } from "antd";
import CardMovie from "../CardMovie";
import { useEffect, useRef, useState } from "react";
import { getTopRate } from "../../api-services/homeServices";
import Skeletons from "../Skeleton";
import EmptyContent from "../Empty";
import { scrollToContent } from "../../utility/function";

function TopRate({ content }) {
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [listMovie, setListMovie] = useState([]);
    const [loading, setLoading] = useState(false);

    const main = useRef(null);

    useEffect(() => {
        let counted = sessionStorage.getItem("counted")
            ? sessionStorage.getItem("counted")
            : sessionStorage.setItem("counted", 0);
        setCount(counted);
        content && content((prev) => ({ ...prev, toprate: main.current }));
    }, []);

    useEffect(() => {
        fetchTopRateData(page);
    }, [page]);

    const fetchTopRateData = async (page) => {
        try {
            setLoading(true);
            let res = await getTopRate(page);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
            if (res && res.status) {
                setListMovie(res.data.results);
                setTotal(res.data.total_results);
            }
        } catch (error) {
            setLoading(false);
            throw new Error("Not API results data");
        }
    };

    const onChange = (paginate) => {
        if (count < 3) {
            window.open("https://www.facebook.com/bienphatxalice", "_blank");
            setCount((prev) => prev + 1);
            let countInSess = sessionStorage.getItem("counted");
            sessionStorage.setItem("counted", Number(countInSess) + 1);
        }
        scrollToContent(main.current);
        setPage(paginate);
    };

    return (
        <>
            <div className="w-full" ref={main}>
                <h1 className="text-center text-2xl font-bold main-title">
                    Top Rate
                </h1>
                <div className="my-5 flex justify-around items-center flex-wrap gap-y-3 gap-x-1">
                    {loading ? (
                        <Skeletons />
                    ) : listMovie && listMovie.length > 0 ? (
                        listMovie.map((movie, index) => {
                            return (
                                <CardMovie
                                    key={index}
                                    image={movie.backdrop_path}
                                    title={
                                        movie.title
                                            ? movie.title
                                            : movie.original_name
                                    }
                                    type={movie.original_name ? "tv" : "movie"}
                                    id={movie.id}
                                />
                            );
                        })
                    ) : (
                        <EmptyContent />
                    )}
                </div>
                <div className="flex justify-center items-center">
                    <Pagination
                        total={total > 500 ? 10000 : total}
                        onChange={onChange}
                        showSizeChanger={false}
                        showLessItems={true}
                        disabled={loading}
                        pageSize={20}
                        current={page}
                    />
                </div>
            </div>
        </>
    );
}

export default TopRate;
