import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

export const Pagination = ({
    currentPage,
    totalPages,
    itemsPerPage,
    onPageChange,
}: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    onPageChange: Function;
}) => {
    const [pages, setPages] = useState<number[]>([]);

    useEffect(() => {
        const newPages = Array.from({ length: totalPages }, (_, index) => index + 1);
        setPages(newPages);
    }, [totalPages, itemsPerPage]);

    return (
        <div className={styles.paginationContainer}>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};
