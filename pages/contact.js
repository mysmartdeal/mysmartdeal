import Layout from "../components/Layout";

export default function Contact() {
  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-16 p-6 bg-white rounded-2xl shadow-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
          📩 문의하기
        </h1>
        <form
          action="https://formspree.io/f/xovdbpjq"
          method="POST"
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">문의 내용</label>
            <textarea
              name="message"
              rows={5}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition shadow"
          >
            전송하기
          </button>
        </form>
      </div>
    </Layout>
  );
}
