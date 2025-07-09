'use client';
import styles from '@/styles/common/MobileMenu.module.scss'
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useOnClickOutside } from 'usehooks-ts';
import clsx from 'clsx';

import { useMediaQuerySafe } from '@/hooks';

import {Button, HeaderNavItems} from "@/components";

export const MobileMenu = () => {
    const pathname = usePathname();
    const isMobile = useMediaQuerySafe('(max-width: 991px)');

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    const handleToggleOpen = useCallback(() => {
        setMobileMenuOpen(mobileMenuOpen => !mobileMenuOpen)
    }, [setMobileMenuOpen])

    const handleClose = useCallback(() => {
        setMobileMenuOpen(false)
    }, [setMobileMenuOpen])

    useEffect(() => {
        if (mobileMenuOpen && isMobile) {
            document.body.classList.add('menu-is-open')
        } else {
            document.body.classList.remove('menu-is-open')
            setMobileMenuOpen(false)
        }
    }, [setMobileMenuOpen, mobileMenuOpen, isMobile])


    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    useOnClickOutside(mobileMenuRef as React.RefObject<HTMLElement>, handleClose);

    return (
        <div className={clsx(styles.cMobileMenu, "c-mobile-menu", "c-mobile")} ref={mobileMenuRef}>
            <Button
                extraClassName={clsx("c-mobile-menu-toggle-btn", mobileMenuOpen && "is-open")}
                btnColor="ghost"
                btnVariant="icon"
                title={mobileMenuOpen? 'Close menu' : "Open menu"}
                onClick={handleToggleOpen}
            >
                <span className="c-mobile-menu-toggle-btn-icon"/>
            </Button>

            <aside className={clsx("c-mobile-menu-content", mobileMenuOpen && "is-open")}>
                <div className='c-mobile-menu-content-wrapper'>
                    <HeaderNavItems extraClassName="c-mobile-menu-nav"/>
                </div>
            </aside>
        </div>
    );
};