/*  This file is part of channel-gravy-token.
 *
 *  channel-gravy-token is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or (at your
 *  option) any later version.
 *
 *  channel-gravy-token is distributed in the hope that it will be useful, but
 *  WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 *  or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public
 *  License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with channel-gravy-token.  If not, see <http://www.gnu.org/licenses/>.
*/
// pragma solidity 0.4.19;

import "./BaseGravyToken.sol";
import "./lib/CastUtils.sol";


contract TxGravyToken is BaseGravyToken {
    using CastUtils for *;

    string private noexpire = "";
    mapping(address => uint256) private mLastIndex;

    function TxGravyToken(
        string _name,
        string _symbol,
        uint256 _granularity,
        address _channel,
        uint256 _mintRate
    ) public BaseGravyToken(_name, _symbol, _granularity, _channel, _mintRate) { // solhint-disable-line no-empty-blocks

    }

    function mint(
        address _client, bytes32 _h, uint8 _v, bytes32 _r, bytes32 _s, string _value, uint256 _index, bytes _data
    ) public {
        requireSignature(_client, _h, _v, _r, _s);
        requireMessage(_h, _client, _value, _index, noexpire);

        uint256 amount = mintRate.mul(_index.sub(mLastIndex[_client]));
        mTotalSupply = mTotalSupply.add(amount);
        mBalances[_client] = mBalances[_client].add(amount);

        callRecipient(msg.sender, 0x0, _client, amount, "", _data, true);
        Minted(msg.sender, _client, amount, _data);
    }

    function requireMessage(
        bytes32 _h, address _client, string _value, uint256 _index, string _expiry
    ) internal view {
        bytes32 proof = keccak256(
            "0x",
            _client.toAsciiString(),
            "0x",
            address(channel).toAsciiString(),
            _value,
            _index,
            _expiry
        );
        require(proof == _h);
    }

    function requireSignature( address _address, bytes32 _h, uint8 _v, bytes32 _r, bytes32 _s) internal pure {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(prefix, _h);
        address signer = ecrecover(prefixedHash, _v, _r, _s);
        require(signer == _address);
    }
}
