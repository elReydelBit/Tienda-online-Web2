"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Modal = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, title = _a.title, message = _a.message, _b = _a.isSuccess, isSuccess = _b === void 0 ? false : _b;
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className={"text-2xl font-semibold mb-4 ".concat(isSuccess ? 'text-green-500' : 'text-red-500')}>
          {title}
        </h2>
        <p className="mb-4">{message}</p>
        <button onClick={onClose} className="bg-purple-500 text-white px-4 py-2 rounded">
          Cerrar
        </button>
      </div>
    </div>);
};
exports.default = Modal;
