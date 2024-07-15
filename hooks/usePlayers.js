import useSWR from 'swr';


const fetcher = (url) => fetch(url).then((res) => res.json())

export const usePlayers = () => {
    const { data, error } = useSWR('/api/fetch-players', fetcher);
    return {
        data,
        error,
        isLoading: !error && !data,
    };
};
