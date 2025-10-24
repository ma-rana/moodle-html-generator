export default function FeedbackPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem' }}>
      <h1>Feedback Request</h1>
      <p>
        Please complete the ethical survey to help improve this educational tool:
      </p>
      <iframe
        src="https://redcap.latrobe.edu.au/redcap/surveys/?s=PPEKFTMPXF4KKEFY"
        width="100%"
        height="800px"
        style={{ border: '1px solid #ddd', borderRadius: '8px' }}
      />
    </div>
  );
}