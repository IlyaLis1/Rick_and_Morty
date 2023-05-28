import React from "react";

export default function EpisodesCard({ name, air_date, episode }) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#FAFAFA',
                boxShadow: '1px 1px 1px 1px black',
                borderRadius: '2em',
                width: '20em',
                textAlign: 'center',
                padding: '2em',
            }}
        >
            <span style={{ fontFamily: 'Roboto', fontSize: '1.3em', color: 'black' }}>{name}</span>
            <span style={{ padding: '1em', fontFamily: 'Roboto', fontSize: '0.9em', color: 'gray' }}>
                {new Date(air_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                })}
            </span>
            <span style={{ fontWeight: '600', color: 'black', fontSize: '0.9em' }}>
                {episode}
            </span>
        </div>
    );
}
