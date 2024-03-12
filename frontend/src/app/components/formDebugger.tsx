"use client"

export const FormDebugger =( props: any ) => (
    <div style={{margin: '1rem 0'}}>


        <strong>props</strong> ={' '}
        {JSON.stringify(props, null, 2)}
    </div>
)