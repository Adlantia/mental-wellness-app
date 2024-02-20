export default function JournalEntry (){
    return (
        <>
            <header style={{ fontSize: '24px', margin: '20px 0', textAlign: 'center' }}>
                Journal
            </header>

            <form id="journalForm" className="mb-10">
                <input
                    type="text"
                    id="entryTitle"
                    name="entryTitle"
                    style={{
                        fontSize: '16px',
                        width: '100%',
                        padding: '10px 10px',
                        marginBottom: '10px',
                        color: '#555',
                    }
                }
                    placeholder="Title"
                    required
                />

                <textarea
                    id="entryContent"
                    name="entryContent"
                    rows= {8}
                    style={{
                        fontSize: '16px',
                        width: '100%',
                        padding: '10px',
                        marginBottom: '10px',
                        color: '#555',
                    }}
                    placeholder="Journal Entry"
                    required>
                </textarea>

                <div style={{textAlign: 'center'}}>
                    <button
                        type="submit"
                        style={{
                            fontSize: '15px',
                            padding: '08px 15px',
                            backgroundColor: '#3498db',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                        }}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    )
}