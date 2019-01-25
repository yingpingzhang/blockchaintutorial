//指定编译器版本大于等于0.4.0小于0.6.0
pragma solidity >=0.4.0 <0.6.0;

//定义一个Election合约
contract Election {

    // 定义一个Candidate候选人结构体
    struct Candidate {
        uint id; //无符号整型ID
        string name;//字符串类型的姓名
        uint voteCount;//无符号整型的投票数量
    }

    // 记录选民账户的投票状态
    mapping(address => bool) public voters;

    //定义键值对映射关系的存储结构来存储候选人
    mapping(uint => Candidate) public candidates;

    //候选人的数量
    uint public candidatesCount;

    // 投票事件
    event votedEvent (
        uint indexed _candidateId
    );

    //默认构造函数，增加三个候选人
     constructor() public {
        addCandidate("Eric");
        addCandidate("Helen");
        addCandidate("Elena");
    }


    //增加候选人
    function addCandidate (string  memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

     // 给候选人投票
    function vote (uint _candidateId) public {
        // 确保选民之前没有投票
        require(!voters[msg.sender]);

        // 确保是合法的候选人
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // 记录选民的投票状态
        voters[msg.sender] = true;

        // 更新候选人的票数
        candidates[_candidateId].voteCount ++;

        // 触发投票事件
       emit votedEvent(_candidateId);
    }
}
