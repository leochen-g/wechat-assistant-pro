module.exports = {
    prefix: 'tw-',
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    theme: {
        screens: {
            xs: '480px',
            sm: '660px',
            md: '1024px',
            lg: '1200px',
            xl: '1440px',
            '2xl': '1920px'
        },
        extend: {
            zIndex: {
                2: 2,
                6000: 6000,
                6001: 6001,
                6002: 6002
            },
            transitionProperty: {
                width: 'width',
                'max-width': 'max-width',
                'min-width': 'min-width',
                height: 'height',
                border: 'border',
                position: 'position'
            },
            lineHeight: {
                4.5: '1.125rem',
                3.5: '0.875rem',
                11: '2.75rem',
                'extra-tight': 1.125
            },
            minWidth: {
                3.5: '0.875rem',
                6: '1.5rem'
            },
            scale: {
                83: '0.83'
            },
            colors: {
                primary: '#FA434E',
                secondary: '#25B275',
                tertiary: '#378EE5',
                quaternary: '#FAEC32',
                'app-neutral': {
                    DEFAULT: '#FAFBFC',
                    1: '#FAFBFC',
                    2: '#EDF2F7',
                    3: '#DAE3ED',
                    4: '#BBC8D6',
                    5: '#A1B5CC',
                    6: '#768EA7',
                    7: '#677E96',
                    8: '#4E647A',
                    9: '#4B555E',
                    10: '#242F3B'
                },
                'app-slate': {
                    DEFAULT: '#030405',
                    1: '#030405',
                    2: '#090C0F',
                    3: '#0B0F14',
                    4: '#0D131A',
                    5: '#111922',
                    6: '#1C242C',
                    7: '#212A33',
                    8: '#27333D',
                    9: '#3D4C5C',
                    10: '#546780'
                },
                'app-red': {
                    1: '#582630',
                    2: '#A0333D',
                    3: '#FA434E',
                    4: '#FC515F',
                    5: '#FF526F'
                },
                'app-green': {
                    1: '#1C493C',
                    2: '#267856',
                    3: '#25B275',
                    4: '#33D18F',
                    5: '#2EE59F'
                },
                'app-yellow': {
                    1: '#575826',
                    2: '#9D9829',
                    3: '#FAEC32',
                    4: '#FCF532',
                    5: '#FFFF59'
                },
                'app-blue': {
                    1: '#1C3C5C',
                    2: '#285F97',
                    3: '#378EE5',
                    4: '#379AF0',
                    5: '#38A1FC'
                },
                'app-lightgrey': {
                    1: '#FAFBFC',
                    2: '#EDF0F5',
                    3: '#D3D7DD',
                    4: '#C2C8D1',
                    5: '#A3AAB5'
                },
                // 新增
                'app-grey': {
                    1: '#626E7A',
                    2: '#A9B0B8',
                    3: '#C7D0D9',
                    4: '#D5DBE0',
                    5: '#E4EAF0'
                },
                'app-orange': {
                    1: '#513A25',
                    2: '#925A28',
                    3: '#E8862B',
                    4: '#ED9B4A',
                    5: '#F5A55B'
                },
                'app-zinc': {
                    1: '#17222E',
                    2: '#1C2B39',
                    3: '#273C50',
                    4: '#36546F',
                    5: '#4E697F'
                },
                'app-black': {
                    1: 'rgba(0, 0, 0, 1)',
                    2: 'rgba(0, 0, 0, 0.8)',
                    3: 'rgba(0, 0, 0, 0.6)',
                    4: 'rgba(0, 0, 0, 0.32)',
                    5: 'rgba(0, 0, 0, 0.16)',
                    6: 'rgba(0, 0, 0, 0.08)'
                },
                'app-white': {
                    1: 'rgba(255, 255, 255, 1)',
                    2: 'rgba(255, 255, 255, 0.8)',
                    3: 'rgba(255, 255, 255, 0.6)',
                    4: 'rgba(255, 255, 255, 0.32)',
                    5: 'rgba(255, 255, 255, 0.16)',
                    6: 'rgba(255, 255, 255, 0.08)'
                }
            },
            fontSize: {
                ssm: '.8125rem',
                msm: '.9375rem'
            },
            width: {
                15: '3.75rem',
                41: '11rem',
                100: '52rem',
                13.5: '3.375rem'
            },
            opacity: {
                72: '.72',
                8: '.08'
            },
            gridTemplateColumns: {
                fill: 'repeat(auto-fill, minmax(0, 1fr))'
            },
            margin: {
                7.5: '1.875rem'
            },
            padding: {
                0.75: '0.1875rem',
                5.5: '1.375rem',
                1.75: '0.4375rem',
                2.75: '0.6875rem'
            },
            borderRadius: {
                18: '1.125rem'
            }
        }
    },
    plugins: [],
}
