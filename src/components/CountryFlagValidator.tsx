import { useState, useEffect } from 'react';

const countries = [
    "AD","AE","AF","AG","AI","AL","AM","AO","AQ","AR","AS","AT","AU","AW","AX","AZ",
    "BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS",
    "BT","BV","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN",
    "CO","CR","CU","CV","CW","CX","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE",
    "EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF",
    "GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY","HK","HM",
    "HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM",
    "JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC",
    "LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK",
    "ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA",
    "NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG",
    "PH","PK","PL","PM","PN","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW",
    "SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS",
    "ST","SV","SX","SY","SZ","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO",
    "TR","TT","TV","TW","TZ","UA","UG","UM","US","UY","UZ","VA","VC","VE","VG","VI",
    "VN","VU","WF","WS","YE","YT","ZA","ZM","ZW"
];

interface CountryFlagValidatorProps {
    password: string;
}

export default function CountryFlagValidator({ password }: CountryFlagValidatorProps) {
    const [selectedCountry] = useState<string>(
        () => countries[Math.floor(Math.random() * countries.length)]
    );
    const [flagError, setFlagError] = useState(false);

    const flagUrl = `https://flagcdn.com/w80/${selectedCountry.toLowerCase()}.png`;

    const isEmpty = password.length === 0;
    const isValid = password.toUpperCase().indexOf(selectedCountry.toUpperCase()) !== -1;

    const cardState = isEmpty ? 'neutral' : isValid ? 'valid' : 'invalid';

    const iconColor = isEmpty
        ? 'var(--text-muted)'
        : isValid
            ? 'var(--strength-strong)'
            : 'var(--strength-weak)';

    return (
        <div className={`validator-card validator-card--${cardState} mt-2`}>
            <div className="validator-card__header">
                <i
                    className={`bi validator-card__icon ${
                        isEmpty ? 'bi-flag' : isValid ? 'bi-check-circle-fill' : 'bi-x-circle'
                    }`}
                    style={{ color: iconColor }}
                />
                <span className="validator-card__title">Zkratka státu</span>
            </div>

            <div className="d-flex align-items-center gap-2 mt-1">
                {!flagError ? (
                    <img
                        src={flagUrl}
                        alt={`Vlajka ${selectedCountry}`}
                        style={{ width: '48px', height: 'auto', borderRadius: '3px', border: '1px solid var(--border-color)' }}
                        onError={() => setFlagError(true)}
                    />
                ) : (
                    <span style={{ fontSize: '1.5rem' }}>🏳️</span>
                )}
                <div>
                    <div className="validator-card__value">
                        Heslo musí obsahovat: <strong>{selectedCountry}</strong>
                    </div>
                    <div className="validator-card__sub">
                        {isEmpty
                            ? 'Zadejte heslo'
                            : isValid
                                ? `✓ Zkratka "${selectedCountry}" nalezena`
                                : `Heslo neobsahuje zkratku země: ${selectedCountry}`}
                    </div>
                </div>
            </div>
        </div>
    );
}